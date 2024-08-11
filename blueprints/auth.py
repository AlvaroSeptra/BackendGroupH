# blueprints/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from db import get_db_connection
import uuid

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    conn = get_db_connection()
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM users WHERE email = %s", (data['email'],))
            existing_user = cur.fetchone()
            if existing_user:
                return jsonify({'error': 'User with this email already exists.'}), 400

            user_id = str(uuid.uuid4())  # Konversi UUID ke string
            cur.execute(
                "INSERT INTO users (id, username, email, password, location, role) VALUES (%s, %s, %s, %s, %s, %s)",
                (user_id, data['username'], data['email'], hashed_password, data['location'], data['role'])
            )
            conn.commit()

        return jsonify({'message': 'Registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500

@auth_blueprint.route('/login', methods=['POST'])
def login():
    conn = get_db_connection()
    data = request.get_json()

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
            user = cur.fetchone()
            if not user or not check_password_hash(user['password'], data['password']):
                return jsonify({'error': 'Invalid email or password'}), 401

            access_token = create_access_token(identity={'id': str(user['id']), 'username': user['username'], 'role': user['role']})
            return jsonify({'token': access_token}), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500
