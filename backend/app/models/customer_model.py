from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class CustomerModel(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)

    first_name: Mapped[str]
    last_name: Mapped[str]
    company: Mapped[str]
    email: Mapped[str]
    phone: Mapped[str]
    city: Mapped[str]
    active: Mapped[bool] = mapped_column(default=True)
