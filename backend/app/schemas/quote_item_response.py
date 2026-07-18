from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel

from app.core.pydantic import camel_config


class QuoteItemResponse(BaseModel):

    model_config = camel_config

    id: int
    quote_id: int
    product_id: int

    quantity: int

    unit_price: Decimal

    discount: Decimal

    created_at: datetime
    updated_at: datetime
