from functools import wraps
from flask_login import current_user

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if current_user.role != role:
                return {'message': 'Forbidden'}, 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper