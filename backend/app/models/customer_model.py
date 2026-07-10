from sqlalchemy.orm import Mapped, mapped_column

from app.models.base_model import BaseModel


class CustomerModel(BaseModel):
    __tablename__ = "customers"

    first_name: Mapped[str]
    last_name: Mapped[str]
    company: Mapped[str]
    email: Mapped[str]
    phone: Mapped[str]
    city: Mapped[str]
    active: Mapped[bool] = mapped_column(default=True)
