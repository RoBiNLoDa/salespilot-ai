from app.models.quote import Quote
from app.models.quote_item import QuoteItem
from app.schemas.quote_item_response import QuoteItemResponse
from app.schemas.quote_response import QuoteResponse
from app.services.quote_calculator import QuoteCalculator


class QuoteMapper:

    def __init__(self, calculator: QuoteCalculator):
        self.calculator = calculator

    def item_to_response(
        self,
        item: QuoteItem,
    ) -> QuoteItemResponse:

        totals = self.calculator.calculate_item(item)

        return QuoteItemResponse(
            id=item.id,
            quote_id=item.quote_id,
            product_id=item.product_id,
            product=item.product,
            quantity=item.quantity,
            unit_price=item.unit_price,
            discount=item.discount,
            tax_rate=item.tax_rate,
            totals=totals,
            created_at=item.created_at,
            updated_at=item.updated_at,
        )

    def to_response(
        self,
        quote: Quote,
    ) -> QuoteResponse:

        items = [self.item_to_response(item) for item in quote.items]

        totals = self.calculator.calculate_quote(quote)

        return QuoteResponse(
            id=quote.id,
            quote_number=quote.quote_number,
            customer_id=quote.customer_id,
            customer=quote.customer,
            issue_date=quote.issue_date,
            expiration_date=quote.expiration_date,
            status=quote.status,
            notes=quote.notes,
            items=items,
            totals=totals,
            created_at=quote.created_at,
            updated_at=quote.updated_at,
        )
