from pydantic import ConfigDict


def to_camel(string: str) -> str:
    words = string.split("_")
    return words[0] + "".join(word.capitalize() for word in words[1:])


camel_config = ConfigDict(
    alias_generator=to_camel, populate_by_name=True, from_attributes=True
)
