from fastapi import APIRouter, status, Response

from app.schemas.product_response import ProductResponse
from app.security.dependencies import CurrentUser
from app.services.product_service import ProductServiceDep
from app.schemas.product_create import ProductCreate
from app.schemas.product_update import ProductUpdate

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=list[ProductResponse])
def get_products(service: ProductServiceDep, _: CurrentUser):
    return service.get_all()


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, service: ProductServiceDep, _: CurrentUser):
    return service.get_by_id(product_id)


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(product: ProductCreate, service: ProductServiceDep, _: CurrentUser):
    return service.create(product)


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int, product: ProductUpdate, service: ProductServiceDep, _: CurrentUser
):
    return service.update(product_id, product)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, service: ProductServiceDep, _: CurrentUser):
    service.delete(product_id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
