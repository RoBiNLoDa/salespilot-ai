from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductResponse(BaseModel):
    id: int
    sku: str
    name: str
    description: str | None
    price: Decimal
    cost: Decimal
    stock: int
    active: bool

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
