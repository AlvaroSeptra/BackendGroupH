from flask import Blueprint, request, jsonify
from models import db
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    data = request.get_json()
    user.username = data['username']
    user.email = data['email']
    user.location = data['location']
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200
