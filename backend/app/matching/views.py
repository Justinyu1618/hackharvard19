from flask import Blueprint, request, jsonify
from app import db
from app import bcrypt
from flask_sqlalchemy import SQLAlchemy
# from app.models import User, Score
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy

user_bp = Blueprint("user", __name__, url_prefix='/user')


@user_bp.route('/new_user', methods=['POST'])
def new_user():
	data = request.get_json()
	new_user = User()
	try:
		new_user.populate(data)
		db.session.add(new_user)
		db.session.commit()
	except sqlalchemy.exc.IntegrityError as e:
		db.session.rollback()
		return jsonify(message="Email already exists", success=False),200
	return jsonify(message="New User Created!", success=True), 200
