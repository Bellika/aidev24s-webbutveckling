from flask import request

def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Custom logger request URL: {request.url}")
        return func(*args, **kwargs)
    return wrapper
