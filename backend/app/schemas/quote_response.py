from datetime import date, datetime

from pydantic import BaseModel

from app.enums.quote_status import QuoteStatus

from app.core.pydantic import camel_config
from app.schemas.quote_item_response import QuoteItemResponse
from app.schemas.customer_summary_response import CustomerSummaryResponse


class QuoteResponse(BaseModel):

    model_config = camel_config

    id: int
    quote_number: str
    customer_id: int
    customer: CustomerSummaryResponse
    issue_date: date
    expiration_date: date
    status: QuoteStatus
    notes: str
    items: list[QuoteItemResponse]
    created_at: datetime
    updated_at: datetime
