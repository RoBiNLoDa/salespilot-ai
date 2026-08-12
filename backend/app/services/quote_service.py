from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import date

from app.repositories.quote_repository import QuoteRepository
from app.schemas.quote_create import QuoteCreate
from app.models.quote import Quote
from app.enums.quote_status import QuoteStatus
from app.repositories.customer_repository import CustomerRepository
from app.exceptions.quote import (
    InvalidQuoteDateError,
    InvalidQuoteStatusTransitionError,
)
from app.schemas.quote_update import QuoteUpdate
from app.db.dependencies import get_db
from app.schemas.quote_status_update import QuoteStatusUpdate
from app.services.quote_calculator import QuoteCalculator
from app.mappers.quote_mapper import QuoteMapper
from app.schemas.quote_response import QuoteResponse
from app.exceptions.quote_item import QuoteNotEditableError


class QuoteService:

    def __init__(
        self,
        db: Session,
        mapper: QuoteMapper,
    ):
        self.repository = QuoteRepository(db)
        self.customer_repository = CustomerRepository(db)
        self.mapper = mapper

    ALLOWED_STATUS_TRANSITIONS = {
        QuoteStatus.DRAFT: {
            QuoteStatus.SENT,
        },
        QuoteStatus.SENT: {
            QuoteStatus.ACCEPTED,
            QuoteStatus.REJECTED,
        },
        QuoteStatus.ACCEPTED: set(),
        QuoteStatus.REJECTED: set(),
        QuoteStatus.EXPIRED: set(),
    }

    def _generate_quote_number(self) -> str:

        last_quote = self.repository.get_last_quote()
        current_year = str(date.today().year)

        if last_quote is None:
            return f"COT-{current_year}-000001"

        parts = last_quote.split("-")

        year_quote = parts[1]

        if year_quote != current_year:
            return f"COT-{current_year}-000001"

        number = str((int(parts[2])) + 1).zfill(6)

        return f"COT-{current_year}-{number}"

    def _validate_create_dates(self, issue_date: date, expiration_date: date):

        if expiration_date < issue_date:
            raise InvalidQuoteDateError()

        if issue_date < date.today():
            raise InvalidQuoteDateError()

    def _validate_update_dates(self, issue_date: date, expiration_date: date):

        if expiration_date < issue_date:
            raise InvalidQuoteDateError()

    def _validate_customer(self, customer_id: int) -> None:
        self.customer_repository.get_by_id(customer_id)

    def get_all(self) -> list[QuoteResponse]:

        quotes = self.repository.get_all()

        return [
            self.mapper.to_response(self._update_expired_status(quote))
            for quote in quotes
        ]

    def get_by_id(self, quote_id: int) -> QuoteResponse:

        quote = self.repository.get_by_id(quote_id)

        quote = self._update_expired_status(quote)

        return self.mapper.to_response(quote)

    def create(self, quote_create: QuoteCreate):

        self._validate_customer(quote_create.customer_id)

        issue_date = quote_create.issue_date
        expiration_date = quote_create.expiration_date

        self._validate_create_dates(issue_date, expiration_date)

        quote = Quote(
            quote_number=self._generate_quote_number(),
            customer_id=quote_create.customer_id,
            issue_date=issue_date,
            expiration_date=expiration_date,
            status=QuoteStatus.DRAFT,
            notes=quote_create.notes,
        )

        quote = self.repository.create(quote)

        return self.mapper.to_response(quote)

    def update(
        self,
        quote_id: int,
        quote_update: QuoteUpdate,
    ) -> QuoteResponse:

        quote = self.repository.get_by_id(quote_id)

        self._validate_quote_editable(quote)

        if quote_update.customer_id is not None:
            self._validate_customer(quote_update.customer_id)

        issue_date = quote_update.issue_date or quote.issue_date
        expiration_date = quote_update.expiration_date or quote.expiration_date

        self._validate_update_dates(
            issue_date,
            expiration_date,
        )

        quote = self.repository.update(
            quote_id,
            quote_update,
        )

        return self.mapper.to_response(quote)

    def delete(self, quote_id: int) -> None:

        quote = self.repository.get_by_id(quote_id)

        self._validate_quote_editable(quote)

        self.repository.delete(quote_id)

    def update_status(
        self,
        quote_id: int,
        request: QuoteStatusUpdate,
    ) -> QuoteResponse:

        quote = self.repository.get_by_id(quote_id)

        self._validate_status_transition(
            quote.status,
            request.status,
        )

        quote = self.repository.update_status(
            quote_id,
            request.status,
        )

        return self.mapper.to_response(quote)

    def _validate_status_transition(
        self,
        current_status: QuoteStatus,
        new_status: QuoteStatus,
    ) -> None:

        allowed_statuses = self.ALLOWED_STATUS_TRANSITIONS.get(
            current_status,
            set(),
        )

        if new_status not in allowed_statuses:
            raise InvalidQuoteStatusTransitionError(
                f"No se puede cambiar una cotización de "
                f"{current_status.value} a {new_status.value}."
            )

    def _update_expired_status(self, quote: Quote) -> Quote:

        if quote.status == QuoteStatus.SENT and quote.expiration_date < date.today():
            quote = self.repository.update_status(
                quote.id,
                QuoteStatus.EXPIRED,
            )

        return quote

    def _validate_quote_editable(self, quote: Quote) -> None:

        if quote.status != QuoteStatus.DRAFT:
            raise QuoteNotEditableError()


DB = Annotated[Session, Depends(get_db)]


def get_quote_service(db: DB) -> QuoteService:

    calculator = QuoteCalculator()
    mapper = QuoteMapper(calculator)

    return QuoteService(
        db,
        mapper,
    )


QuoteServiceDep = Annotated[QuoteService, Depends(get_quote_service)]
