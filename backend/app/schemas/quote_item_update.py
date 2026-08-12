from decimal import Decimal

from pydantic import BaseModel, Field

from app.core.pydantic import camel_config


class QuoteItemUpdate(BaseModel):

    model_config = camel_config

    quantity: int = Field(ge=0)

    discount: Decimal = Field(
        ge=0,
        le=100,
    )
