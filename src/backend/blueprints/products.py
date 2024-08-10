from flask import Blueprint, request, jsonify
from models import db
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity

products_blueprint = Blueprint('products', __name__)

@products_blueprint.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'price': p.price,
        'quantity': p.quantity,
        'category': p.category,
        'seller_id': p.seller_id
    } for p in products]), 200

@products_blueprint.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    current_user = get_jwt_identity()
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        quantity=data['quantity'],
        category=data['category'],
        seller_id=current_user['id']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully'}), 201

@products_blueprint.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user = get_jwt_identity()
    product = Product.query.get_or_404(product_id)
    if product.seller_id != current_user['id']:
        return jsonify({'message': 'Permission denied'}), 403
    data = request.get_json()
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    product.quantity = data['quantity']
    product.category = data['category']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'}), 200

@products_blueprint.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user = get_jwt_identity()
    product = Product.query.get_or_404(product_id)
    if product.seller_id != current_user['id']:
        return jsonify({'message': 'Permission denied'}), 403
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200
