"""EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT."""
import os

# EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT
MONGO_URI = "mongodb://mongo:sAaUrUyEWfuYgnHTJhWnYQlQhoDZvgQj@mainline.proxy.rlwy.net:35014"


def get_mongo_uri() -> str:
    """Return the active MongoDB URI, preferring the environment variable."""
    return os.getenv("MONGO_URI", MONGO_URI)


def print_connection_help() -> None:
    """Print helper commands for MongoDB connections."""
    uri = get_mongo_uri()
    print("mongosh command:")
    print(f"mongosh \"{uri}\"")
    print("Railway CLI connect command:")
    print("railway connect MongoDB")


if __name__ == "__main__":
    print_connection_help()
