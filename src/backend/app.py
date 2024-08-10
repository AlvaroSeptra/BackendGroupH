from flask import Flask
from models import db
from blueprints.auth import auth_blueprint
from blueprints.products import products_blueprint
from blueprints.vouchers import vouchers_blueprint
from blueprints.cart import cart_blueprint
from blueprints.users import users_blueprint
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_blueprint)
app.register_blueprint(products_blueprint)
app.register_blueprint(vouchers_blueprint)
app.register_blueprint(cart_blueprint)
app.register_blueprint(users_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
