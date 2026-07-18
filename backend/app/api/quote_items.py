from fastapi import APIRouter, status, Response

from app.services.quote_item_service import QuoteItemServiceDep
from app.security.dependencies import CurrentUser
from app.schemas.quote_item_response import QuoteItemResponse
from app.schemas.quote_item_create import QuoteItemCreate
from app.schemas.quote_item_update import QuoteItemUpdate

router = APIRouter(prefix="/quote-items", tags=["Quote Items"])


@router.get("/", response_model=list[QuoteItemResponse])
def get_quotes_items(service: QuoteItemServiceDep, _: CurrentUser):
    return service.get_all()


@router.get("/{quote_item_id}", response_model=QuoteItemResponse)
def get_quote_item(quote_item_id: int, service: QuoteItemServiceDep, _: CurrentUser):
    return service.get_by_id(quote_item_id)


@router.post("/", response_model=QuoteItemResponse, status_code=status.HTTP_201_CREATED)
def create_quote_item(
    quote_item: QuoteItemCreate, service: QuoteItemServiceDep, _: CurrentUser
):
    return service.create(quote_item)


@router.put("/{quote_item_id}", response_model=QuoteItemResponse)
def update_quote_item(
    quote_item_id: int,
    quote_item: QuoteItemUpdate,
    service: QuoteItemServiceDep,
    _: CurrentUser,
):
    return service.update(quote_item_id, quote_item)


@router.delete("/{quote_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote_item(quote_item_id: int, service: QuoteItemServiceDep, _: CurrentUser):
    service.delete(quote_item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
