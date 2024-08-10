from flask import Blueprint, request, jsonify
from models import db
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, location=data['location'], role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registered successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login failed'}), 401
    access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': user.role})
    return jsonify({'token': access_token}), 200

@auth_blueprint.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    return jsonify({
        'username': user.username,
        'email': user.email,
        'location': user.location,
        'role': user.role
    }), 200
