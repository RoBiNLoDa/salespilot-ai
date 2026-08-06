from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel
from app.models.quote import Quote


class Customer(BaseModel):
    __tablename__ = "customers"

    first_name: Mapped[str]
    last_name: Mapped[str]
    company: Mapped[str]
    email: Mapped[str]
    phone: Mapped[str]
    city: Mapped[str]
    quotes: Mapped[list["Quote"]] = relationship(back_populates="customer")
    active: Mapped[bool] = mapped_column(default=True)
