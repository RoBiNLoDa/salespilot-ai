from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.schemas.product_create import ProductCreate
from app.schemas.product_update import ProductUpdate
from app.repositories.product_repository import ProductRepository
from app.exceptions.product import ExistingSkuError
from app.db.dependencies import get_db


class ProductService:

    def __init__(self, db: Session):
        self.repository = ProductRepository(db)

    def get_all(self):
        return self.repository.get_all()

    def get_by_id(self, product_id: int):
        return self.repository.get_by_id(product_id)

    def create(self, product: ProductCreate):

        existing_product = self.repository.get_by_sku(product.sku)

        if existing_product:
            raise ExistingSkuError()

        return self.repository.create(product)

    def update(self, product_id: int, product: ProductUpdate):

        if product.sku is not None:
            existing_product = self.repository.get_by_sku(product.sku)

            if existing_product and existing_product.id != product_id:
                raise ExistingSkuError()

        return self.repository.update(product_id, product)

    def delete(self, product_id: int):
        self.repository.delete(product_id)


DB = Annotated[Session, Depends(get_db)]


def get_product_service(db: DB) -> ProductService:

    return ProductService(db)


ProductServiceDep = Annotated[ProductService, Depends(get_product_service)]
