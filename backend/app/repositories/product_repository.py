from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product_create import ProductCreate
from app.schemas.product_update import ProductUpdate
from app.exceptions.product import ProductNotFoundError


class ProductRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Product]:
        statement = select(Product)

        return self.db.scalars(statement).all()

    def get_by_id(self, product_id: int) -> Product:

        db_product = self.db.get(Product, product_id)

        if db_product is None:
            raise ProductNotFoundError()

        return db_product

    def get_by_sku(self, sku: str) -> Product | None:

        db_product = select(Product).where(Product.sku == sku)

        return self.db.scalar(db_product)

    def create(self, product: ProductCreate) -> Product:
        db_product = Product(
            sku=product.sku,
            name=product.name,
            description=product.description,
            price=product.price,
            cost=product.cost,
            stock=product.stock,
            active=product.active,
        )

        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)

        return db_product

    def update(self, product_id: int, product: ProductUpdate) -> Product:

        db_product = self.get_by_id(product_id)

        for key, value in product.model_dump(exclude_unset=True).items():
            setattr(db_product, key, value)

        self.db.commit()
        self.db.refresh(db_product)

        return db_product

    def delete(self, product_id: int) -> None:

        db_product = self.get_by_id(product_id)

        self.db.delete(db_product)
        self.db.commit()
