from fastapi import HTTPException, status


class QuoteItemNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail="Quote Item not found"
        )


class InvalidQuantityError(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="Quantity Error")


class QuoteNotEditableError(Exception):
    pass
