from fastapi import FastAPI
from backend.app.api.customers import router as customer_router

app = FastAPI(title="SalesPilot AI API")

app.include_router(customer_router, prefix="/api/v1")
