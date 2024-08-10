from flask import Blueprint, request, jsonify
from models import db
from models.voucher import Voucher
from flask_jwt_extended import jwt_required, get_jwt_identity

vouchers_blueprint = Blueprint('vouchers', __name__)

@vouchers_blueprint.route('/vouchers', methods=['POST'])
@jwt_required()
def create_voucher():
    current_user = get_jwt_identity()
    data = request.get_json()
    new_voucher = Voucher(
        code=data['code'],
        discount=data['discount'],
        seller_id=current_user['id']
    )
    db.session.add(new_voucher)
    db.session.commit()
    return jsonify({'message': 'Voucher created successfully'}), 201
