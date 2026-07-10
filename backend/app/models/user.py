from sqlalchemy import Enum
from sqlalchemy.orm import Mapped, mapped_column

from app.enums.role import Role
from app.models.base_model import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    first_name: Mapped[str]

    last_name: Mapped[str]

    email: Mapped[str] = mapped_column(unique=True, index=True)

    password_hash: Mapped[str]

    role: Mapped[Role] = mapped_column(
        Enum(Role),
        default=Role.ADMIN,
    )

    active: Mapped[bool] = mapped_column(default=True)
