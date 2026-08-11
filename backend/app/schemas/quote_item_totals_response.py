from decimal import Decimal

from pydantic import BaseModel

from app.core.pydantic import camel_config


class QuoteItemTotalsResponse(BaseModel):

    model_config = camel_config

    subtotal: Decimal

    discount: Decimal

    total: Decimal
