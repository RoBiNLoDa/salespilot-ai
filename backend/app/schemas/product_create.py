from decimal import Decimal

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    sku: str = Field(min_length=1, max_length=50)
    name: str = Field(min_length=1, max_length=150)
    description: str | None = Field(default=None, max_length=500)

    price: Decimal = Field(gt=0)
    cost: Decimal = Field(ge=0)

    stock: int = Field(default=0, ge=0)

    active: bool = True
