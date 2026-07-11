class InvalidCredentialsError(Exception):
    """Raised when the email or password is invalid."""

    pass


class InactiveUserError(Exception):
    """Raised when the user is inactive."""

    pass
