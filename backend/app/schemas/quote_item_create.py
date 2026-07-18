from pydantic import BaseModel, Field

from app.core.pydantic import camel_config


class QuoteItemCreate(BaseModel):

    model_config = camel_config

    quote_id: int
    product_id: int
    quantity: int = Field(gt=0)
