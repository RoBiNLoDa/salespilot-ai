from datetime import date

from pydantic import BaseModel

from app.core.pydantic import camel_config
from app.enums.quote_status import QuoteStatus


class QuoteUpdate(BaseModel):

    model_config = camel_config

    customer_id: int | None = None
    issue_date: date | None = None
    expiration_date: date | None = None
    status: QuoteStatus | None = None
    notes: str | None = None
