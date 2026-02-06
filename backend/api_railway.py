"""EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT.

Single source of truth for Railway connection settings.
"""
import os

# EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT
MONGO_URI = "mongodb://mongo:sAaUrUyEWfuYgnHTJhWnYQlQhoDZvgQj@mainline.proxy.rlwy.net:35014"


def get_mongo_uri() -> str:
    """Return the active MongoDB URI.

    Priority:
    1) MONGO_URI environment variable
    2) MONGO_URI constant in this file
    """
    return os.getenv("MONGO_URI", MONGO_URI)


def print_connection_help() -> None:
    """Print helpful connection commands."""
    uri = get_mongo_uri()
    print("MongoDB Shell:")
    print(f"mongosh \"{uri}\"")
    print("\nRailway CLI:")
    print("railway connect MongoDB")


if __name__ == "__main__":
    print_connection_help()
