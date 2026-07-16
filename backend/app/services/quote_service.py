from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import date

from app.repositories.quote_repository import QuoteRepository
from app.schemas.quote_create import QuoteCreate
from app.models.quote import Quote
from app.enums.quote_status import QuoteStatus
from app.repositories.customer_repository import CustomerRepository
from app.exceptions.quote import InvalidQuoteDateError
from app.schemas.quote_update import QuoteUpdate
from app.db.dependencies import get_db


class QuoteService:

    def __init__(self, db: Session):
        self.repository = QuoteRepository(db)
        self.customer_repository = CustomerRepository(db)

    def _generate_quote_number(self) -> str:

        last_quote = self.repository.get_last_quote()
        current_year = date.today().year

        if last_quote is None:
            return f"COT-{current_year}-000001"

        parts = last_quote.split("-")

        year_quote = int(parts[1])

        if year_quote != current_year:
            return f"COT-{current_year}-000001"

        number = str((int(parts[2])) + 1).zfill(6)

        return f"COT-{current_year}-{number}"

    def _validate_dates(self, issue_date: date, expiration_date: date):

        if expiration_date < issue_date:
            raise InvalidQuoteDateError()

        if issue_date < date.today():
            raise InvalidQuoteDateError()

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, quote_id: int):
        return self.repository.get_by_id(quote_id)

    def create(self, quote_create: QuoteCreate):

        self.customer_repository.get_by_id(quote_create.customer_id)

        issue_date = quote_create.issue_date
        expiration_date = quote_create.expiration_date

        self._validate_dates(issue_date, expiration_date)

        quote = Quote(
            quote_number=self._generate_quote_number(),
            customer_id=quote_create.customer_id,
            issue_date=issue_date,
            expiration_date=expiration_date,
            status=QuoteStatus.DRAFT,
            notes=quote_create.notes,
        )

        return self.repository.create(quote)

    def update(self, quote_id: int, quote_update: QuoteUpdate):

        if quote_update.customer_id is not None:
            self.customer_repository.get_by_id(quote_update.customer_id)

        db_quote = self.repository.get_by_id(quote_id)

        issue_date = quote_update.issue_date or db_quote.issue_date
        expiration_date = quote_update.expiration_date or db_quote.expiration_date

        self._validate_dates(issue_date, expiration_date)

        return self.repository.update(quote_id, quote_update)

    def delete(self, quote_id: int):
        self.repository.delete(quote_id)


DB = Annotated[Session, Depends(get_db)]


def get_quote_service(db: DB) -> QuoteService:
    return QuoteService(db)


QuoteServiceDep = Annotated[QuoteService, Depends(get_quote_service)]
