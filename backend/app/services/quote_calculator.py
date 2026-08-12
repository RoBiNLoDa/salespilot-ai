from decimal import Decimal

from app.models.quote_item import QuoteItem
from app.schemas.quote_item_totals_response import QuoteItemTotalsResponse
from app.models.quote import Quote
from app.schemas.quote_totals_response import QuoteTotalsResponse


class QuoteCalculator:

    def calculate_item_subtotal(
        self,
        quantity: int,
        unit_price: Decimal,
    ) -> Decimal:
        return Decimal(quantity) * unit_price

    def calculate_item_discount(
        self,
        subtotal: Decimal,
        discount: Decimal,
    ) -> Decimal:
        return subtotal * (discount / Decimal("100"))

    def calculate_item_taxable(
        self,
        subtotal: Decimal,
        discount_amount: Decimal,
    ) -> Decimal:
        return subtotal - discount_amount

    def calculate_item(
        self,
        item: QuoteItem,
    ) -> QuoteItemTotalsResponse:

        subtotal = self.calculate_item_subtotal(
            item.quantity,
            item.unit_price,
        )

        discount = self.calculate_item_discount(
            subtotal,
            item.discount,
        )

        taxable = self.calculate_item_taxable(
            subtotal,
            discount,
        )

        tax = self.calculate_item_tax(
            taxable,
            item.tax_rate,
        )

        total = taxable + tax

        return QuoteItemTotalsResponse(
            subtotal=subtotal,
            discount=discount,
            tax=tax,
            total=total,
        )

    def calculate_quote(self, quote: Quote) -> QuoteTotalsResponse:

        subtotal = Decimal("0")
        discount = Decimal("0")
        tax = Decimal("0")

        for item in quote.items:

            item_totals = self.calculate_item(item)

            subtotal += item_totals.subtotal
            discount += item_totals.discount
            tax += item_totals.tax

        total = subtotal - discount + tax

        return QuoteTotalsResponse(
            subtotal=subtotal,
            discount=discount,
            tax=tax,
            total=total,
        )

    def calculate_item_tax(
        self,
        taxable: Decimal,
        tax_rate: Decimal,
    ) -> Decimal:

        return taxable * (tax_rate / Decimal("100"))
