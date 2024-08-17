# blueprints/products.py
from flask import Blueprint, request, jsonify
from db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid
from role_checker.py import role_required

products_blueprint = Blueprint('products', __name__)

@products_blueprint.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products")
            products = cur.fetchall()
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500

@products_blueprint.route('/products', methods=['POST'])
@jwt_required()
@role_required('seller')
def add_product():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    data = request.get_json()

    try:
        product_id = str(uuid.uuid4())
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO products (id, name, description, price, quantity, category, seller_id) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (product_id, data['name'], data['description'], data['price'], data['quantity'], data['category'], str(current_user['id']))
            )
            conn.commit()
        return jsonify({'message': 'Product added successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500
    
@products_blueprint.route('/products/<uuid:product_id>', methods=['PUT'])
@jwt_required()
@role_required('seller')
def update_product(product_id):
    conn = get_db_connection()
    current_user = get_jwt_identity()
    data = request.get_json()

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE id = %s AND seller_id = %s", (str(product_id), str(current_user['id'])))
            product = cur.fetchone()
            if not product:
                return jsonify({'error': 'Product not found or you do not have permission to update this product.'}), 404

            cur.execute(
                "UPDATE products SET name = %s, description = %s, price = %s, quantity = %s, category = %s WHERE id = %s AND seller_id = %s",
                (data['name'], data['description'], data['price'], data['quantity'], data['category'], str(product_id), str(current_user['id']))
            )
            conn.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500

@products_blueprint.route('/products/<uuid:product_id>', methods=['DELETE'])
@jwt_required()
@role_required('seller')
def delete_product(product_id):
    conn = get_db_connection()
    current_user = get_jwt_identity()

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE id = %s AND seller_id = %s", (str(product_id), str(current_user['id'])))
            product = cur.fetchone()
            if not product:
                return jsonify({'error': 'Product not found or you do not have permission to delete this product.'}), 404

            cur.execute("DELETE FROM products WHERE id = %s", (str(product_id),))
            conn.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500
    finally:
        conn.close()


@products_blueprint.route('/products/seller', methods=['GET'])
@jwt_required()
@role_required('seller')
def get_seller_products():
    conn = get_db_connection()
    current_user = get_jwt_identity()

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE seller_id = %s", (str(current_user['id']),))
            products = cur.fetchall()

            formatted_products = [
                {
                    "id": product['id'],
                    "name": product['name'],
                    "description": product['description'],
                    "price": product['price'],
                    "quantity": product['quantity'],
                    "category": product['category'],
                    "seller_id": product['seller_id']
                }
                for product in products
            ]

        return jsonify(formatted_products), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500
    finally:
        conn.close()