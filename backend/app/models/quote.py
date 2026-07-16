from datetime import date

from sqlalchemy import Date, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base_model import BaseModel
from app.enums.quote_status import QuoteStatus


class Quote(BaseModel):
    __tablename__ = "quotes"

    quote_number: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        index=True,
    )

    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))

    issue_date: Mapped[date] = mapped_column(Date)

    expiration_date: Mapped[date] = mapped_column(Date)

    status: Mapped[QuoteStatus] = mapped_column(
        Enum(QuoteStatus),
        default=QuoteStatus.DRAFT,
    )

    notes: Mapped[str | None] = mapped_column(String(500))
