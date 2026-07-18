from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel
from app.enums.quote_status import QuoteStatus

if TYPE_CHECKING:
    from app.models.quote_item import QuoteItem


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
        Enum(QuoteStatus, name="quote_status"),
        default=QuoteStatus.DRAFT,
    )

    notes: Mapped[str | None] = mapped_column(String(500))

    items: Mapped[list["QuoteItem"]] = relationship(
        back_populates="quote",
        cascade="all, delete-orphan",
    )
