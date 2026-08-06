from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.quote import Quote
from app.exceptions.quote import QuoteNotFoundError
from app.schemas.quote_update import QuoteUpdate
from app.models.quote_item import QuoteItem


class QuoteRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Quote]:
        statement = select(Quote).options(selectinload(Quote.customer))

        return self.db.scalars(statement).all()

    def get_by_id(self, quote_id: int) -> Quote:

        statement = (
            select(Quote)
            .options(
                selectinload(Quote.customer),
                selectinload(Quote.items).selectinload(QuoteItem.product),
            )
            .where(Quote.id == quote_id)
        )

        db_quote = self.db.scalar(statement)

        if db_quote is None:
            raise QuoteNotFoundError()

        return db_quote

    def create(self, quote: Quote) -> Quote:

        self.db.add(quote)
        self.db.commit()
        self.db.refresh(quote)

        return quote

    def update(self, quote_id: int, quote: QuoteUpdate) -> Quote:

        db_quote = self.get_by_id(quote_id)

        for key, value in quote.model_dump(
            exclude_unset=True, exclude_none=True
        ).items():
            setattr(db_quote, key, value)

        self.db.commit()
        self.db.refresh(db_quote)

        return db_quote

    def delete(self, quote_id: int) -> None:

        db_quote = self.get_by_id(quote_id)

        self.db.delete(db_quote)
        self.db.commit()

    def get_last_quote(self) -> str | None:

        query = select(Quote.quote_number).order_by(Quote.id.desc()).limit(1)

        return self.db.scalar(query)
