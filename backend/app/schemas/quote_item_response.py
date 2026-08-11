from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel

from app.core.pydantic import camel_config
from app.schemas.product_summary_response import ProductSummaryResponse
from app.schemas.quote_item_totals_response import QuoteItemTotalsResponse


class QuoteItemResponse(BaseModel):

    model_config = camel_config

    id: int
    quote_id: int
    product_id: int
    product: ProductSummaryResponse
    quantity: int
    unit_price: Decimal
    discount: Decimal

    totals: QuoteItemTotalsResponse

    created_at: datetime
    updated_at: datetime
