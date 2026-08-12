from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel
from app.core.pydantic import camel_config


class ProductResponse(BaseModel):
    id: int
    sku: str
    name: str
    description: str | None
    price: Decimal
    cost: Decimal
    stock: int
    tax_rate: Decimal
    active: bool

    created_at: datetime
    updated_at: datetime

    model_config = camel_config
