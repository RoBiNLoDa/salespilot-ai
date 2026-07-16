from fastapi import HTTPException, status


class QuoteNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail="Quote not found"
        )


class InvalidQuoteDateError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail="Dates have an error",
        )
