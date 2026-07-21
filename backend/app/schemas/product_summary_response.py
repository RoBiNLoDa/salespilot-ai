from pydantic import BaseModel

from app.core.pydantic import camel_config


class ProductSummaryResponse(BaseModel):

    model_config = camel_config

    id: int
    sku: str
    name: str
