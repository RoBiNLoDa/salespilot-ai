from decimal import Decimal
from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.repositories.product_repository import ProductRepository
from app.repositories.quote_item_repository import QuoteItemRepository
from app.repositories.quote_repository import QuoteRepository
from app.schemas.quote_item_create import QuoteItemCreate
from app.exceptions.quote_item import InvalidQuantityError
from app.models.quote_item import QuoteItem
from app.schemas.quote_item_update import QuoteItemUpdate
from app.db.dependencies import get_db
from app.schemas.quote_item_response import QuoteItemResponse
from app.services.quote_calculator import QuoteCalculator


class QuoteItemService:

    def __init__(
        self,
        db: Session,
        calculator: QuoteCalculator,
    ):
        self.repository = QuoteItemRepository(db)
        self.quote_repository = QuoteRepository(db)
        self.product_repository = ProductRepository(db)
        self.calculator = calculator

    def get_all(self):

        items = self.repository.get_all()

        return [self._to_response(item) for item in items]

    def get_by_id(self, quote_item_id: int):

        item = self.repository.get_by_id(quote_item_id)

        return self._to_response(item)

    def create(self, quote_item_create: QuoteItemCreate):

        self.quote_repository.get_by_id(quote_item_create.quote_id)

        product = self.product_repository.get_by_id(quote_item_create.product_id)

        if quote_item_create.quantity <= 0:
            raise InvalidQuantityError()

        quote_item = QuoteItem(
            quote_id=quote_item_create.quote_id,
            product_id=quote_item_create.product_id,
            quantity=quote_item_create.quantity,
            unit_price=product.price,
            discount=Decimal("0.00"),
        )

        quote_item = self.repository.create(quote_item)

        return self._to_response(quote_item)

    def update(self, quote_item_id: int, quote_item_update: QuoteItemUpdate):

        if quote_item_update.quantity <= 0:
            raise InvalidQuantityError()

        quote_item = self.repository.update(quote_item_id, quote_item_update)

        return self._to_response(quote_item)

    def delete(self, quote_item_id: int):
        self.repository.delete(quote_item_id)

    def _to_response(self, item: QuoteItem) -> QuoteItemResponse:

        totals = self.calculator.calculate_item(item)

        return QuoteItemResponse(
            id=item.id,
            quote_id=item.quote_id,
            product_id=item.product_id,
            product=item.product,
            quantity=item.quantity,
            unit_price=item.unit_price,
            discount=item.discount,
            totals=totals,
            created_at=item.created_at,
            updated_at=item.updated_at,
        )


DB = Annotated[Session, Depends(get_db)]


def get_quote_service(db: DB) -> QuoteItemService:
    return QuoteItemService(db, QuoteCalculator())


QuoteItemServiceDep = Annotated[QuoteItemService, Depends(get_quote_service)]
