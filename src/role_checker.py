import jwt
from functools import wraps
from flask import request, jsonify

SECRET_KEY = 'your_secret_key'  # Replace with your actual secret key

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if auth_header:
                try:
                    token = auth_header.split(" ")[1]
                    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                    user_role = decoded_token.get('role')
                    if user_role != role:
                        return jsonify({'message': 'Forbidden'}), 403
                except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token has expired'}), 401
                except jwt.InvalidTokenError:
                    return jsonify({'message': 'Invalid token'}), 401
            else:
                return jsonify({'message': 'Token is missing'}), 401

            return fn(*args, **kwargs)
        return decorator
    return wrapper
