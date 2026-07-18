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


class QuoteItemService:

    def __init__(self, db: Session):
        self.repository = QuoteItemRepository(db)
        self.quote_repository = QuoteRepository(db)
        self.product_repository = ProductRepository(db)

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, quote_item_id: int):
        return self.repository.get_by_id(quote_item_id)

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

        return self.repository.create(quote_item)

    def update(self, quote_item_id: int, quote_item_update: QuoteItemUpdate):

        if quote_item_update.quantity <= 0:
            raise InvalidQuantityError()

        return self.repository.update(quote_item_id, quote_item_update)

    def delete(self, quote_item_id: int):
        self.repository.delete(quote_item_id)


DB = Annotated[Session, Depends(get_db)]


def get_quote_service(db: DB) -> QuoteItemService:
    return QuoteItemService(db)


QuoteItemServiceDep = Annotated[QuoteItemService, Depends(get_quote_service)]
