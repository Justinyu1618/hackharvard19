from flask import Blueprint, request, jsonify
from app import db
from flask_sqlalchemy import SQLAlchemy
# from app.models import User
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
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

@user_bp.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	user = User.query.filter(User.email==data['email']).first()
	if not user:
		return jsonify(message="Email not found", success=False), 201
	try:
		if not bcrypt.check_password_hash(user.password, data['password']):
			return jsonify(message="Incorrect email or password!", success=False), 201
	except ValueError:
		return jsonify(message="Incorrect password format. Ping Justin", success=False), 201
	# if not user.confirmed:
	# 	return jsonify(message="Confirmation from Admin Needed!", success=False), 201
	access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=3))
	return jsonify(access_token=access_token, admin=user.admin, success=True), 200


@user_bp.route('/current_user', methods=['GET'])
@jwt_required
def current_user():
	user = User.query.filter(User.id==get_jwt_identity()).first()
	print(get_jwt_identity())
	return jsonify(user.serialize()), 200

@user_bp.route('/get_users', methods=['GET'])
@jwt_required
def get_users():
	users = User.query.all()
	users_dicts = []
	for u in users:
		d = u.serialize()
		d["last_graded"] = sorted([s.timestamp for s in u.scores], reverse=True)[0] if u.scores else None
		users_dicts.append(d)
	users_dicts = sorted(users_dicts, key=lambda x: x["name"])
	users_dicts = sorted(users_dicts, key=lambda x: int(x["confirmed"]==True), reverse=True)

	return jsonify(users_dicts), 200
