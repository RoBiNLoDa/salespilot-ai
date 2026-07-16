from datetime import date

from pydantic import BaseModel

from app.core.pydantic import camel_config


class QuoteCreate(BaseModel):

    model_config = camel_config

    customer_id: int
    issue_date: date
    expiration_date: date
    notes: str | None
