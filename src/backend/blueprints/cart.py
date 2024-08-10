from flask import Blueprint, request, jsonify
from models import db
from models.cart import Cart
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_blueprint = Blueprint('cart', __name__)

@cart_blueprint.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    data = request.get_json()
    product = Product.query.get(data['product_id'])
    if product.quantity < data['quantity']:
        return jsonify({'message': 'Not enough quantity available'}), 400
    new_cart_item = Cart(
        customer_id=current_user['id'],
        product_id=data['product_id'],
        quantity=data['quantity']
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({'message': 'Added to cart successfully'}), 201

@cart_blueprint.route('/cart/checkout', methods=['POST'])
@jwt_required()
def checkout():
    current_user = get_jwt_identity()
    cart_items = Cart.query.filter_by(customer_id=current_user['id']).all()
    for item in cart_items:
        product = Product.query.get(item.product_id)
        if product.quantity < item.quantity:
            return jsonify({'message': f'Not enough {product.name} in stock'}), 400
        product.quantity -= item.quantity
        db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Checkout successful'}), 200
