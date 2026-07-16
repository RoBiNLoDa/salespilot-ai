from fastapi import APIRouter

from app.api.customers import router as customers_router
from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.quotes import router as quote_router

api_router = APIRouter()

api_router.include_router(customers_router)
api_router.include_router(auth_router)
api_router.include_router(products_router)
api_router.include_router(quote_router)
