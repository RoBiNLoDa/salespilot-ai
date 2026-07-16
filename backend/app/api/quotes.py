from fastapi import APIRouter, status, Response

from app.schemas.quote_response import QuoteResponse
from app.services.quote_service import QuoteServiceDep
from app.security.dependencies import CurrentUser
from app.schemas.quote_create import QuoteCreate
from app.schemas.quote_update import QuoteUpdate

router = APIRouter(prefix="/quotes", tags=["Quotes"])


@router.get("/", response_model=list[QuoteResponse])
def get_quotes(service: QuoteServiceDep, _: CurrentUser):
    return service.get_all()


@router.get("/{quote_id}", response_model=QuoteResponse)
def get_quote(quote_id: int, service: QuoteServiceDep, _: CurrentUser):
    return service.get_by_id(quote_id)


@router.post("/", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
def create_quote(quote: QuoteCreate, service: QuoteServiceDep, _: CurrentUser):
    return service.create(quote)


@router.put("/{quote_id}", response_model=QuoteResponse)
def update_quote(
    quote_id: int, quote: QuoteUpdate, service: QuoteServiceDep, _: CurrentUser
):
    return service.update(quote_id, quote)


@router.delete("/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote(quote_id: int, service: QuoteServiceDep, _: CurrentUser):
    service.delete(quote_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
