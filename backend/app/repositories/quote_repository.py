from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.quote import Quote
from app.exceptions.quote import QuoteNotFoundError
from app.schemas.quote_create import QuoteCreate
from app.schemas.quote_update import QuoteUpdate


class QuoteRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Quote]:
        statement = select(Quote)

        return self.db.scalars(statement).all()

    def get_by_id(self, quote_id: int) -> Quote:

        db_quote = self.db.get(Quote, quote_id)

        if db_quote is None:
            raise QuoteNotFoundError()

        return db_quote

    def create(self, quote: QuoteCreate) -> Quote:

        db_quote = Quote(
            customer_id=quote.customer_id,
            issue_date=quote.issue_date,
            expiration_date=quote.expiration_date,
            notes=quote.notes,
        )

        self.db.add(db_quote)
        self.db.commit()
        self.db.refresh(db_quote)

        return db_quote

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
