from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.quote_item import QuoteItem
from app.exceptions.quote_item import QuoteItemNotFoundError
from app.schemas.quote_item_update import QuoteItemUpdate


class QuoteItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[QuoteItem]:
        statement = select(QuoteItem)

        return self.db.scalars(statement).all()

    def get_by_id(self, quote_item_id: int) -> QuoteItem:

        db_quote_item = self.db.get(QuoteItem, quote_item_id)

        if db_quote_item is None:
            raise QuoteItemNotFoundError()

        return db_quote_item

    def create(self, quote_item: QuoteItem):

        self.db.add(quote_item)
        self.db.commit()
        self.db.refresh(quote_item)

        return quote_item

    def update(self, quote_item_id: int, quote_item: QuoteItemUpdate) -> QuoteItem:

        db_quote_item = self.get_by_id(quote_item_id)

        for key, value in quote_item.model_dump(
            exclude_unset=True, exclude_none=True
        ).items():
            setattr(db_quote_item, key, value)

        self.db.commit()
        self.db.refresh(db_quote_item)

        return db_quote_item

    def delete(self, quote_item_id: int) -> None:

        db_quote_item = self.get_by_id(quote_item_id)

        self.db.delete(db_quote_item)
        self.db.commit()
