from pydantic import BaseModel

from app.core.pydantic import camel_config
from app.enums.quote_status import QuoteStatus


class QuoteStatusUpdate(BaseModel):

    model_config = camel_config

    status: QuoteStatus
