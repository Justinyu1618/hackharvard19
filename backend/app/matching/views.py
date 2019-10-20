from flask import Blueprint, request, jsonify
from app import db
from app import bcrypt
from flask_sqlalchemy import SQLAlchemy
from app.models import User, Match
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy
from .algorithm import calculate_matches
import random

match_bp = Blueprint("match", __name__, url_prefix='/matching')

dist = 20

@match_bp.route('/get_matches', methods=['GET'])
def get_current_matches():
	args = request.args
	user = User.query.filter(User.id == args.get('user')).first()
	target_range = 20 * user.settings['match_strength']
	
	matches = calculate_matches(user)
	for match in matches:
		db.session.add(match)
		db.session.commit()
	return jsonify([m.serialize() for m in matches])


# @user_bp.route('/sender_response', methods=['GET'])
# def sender_response():
# 	match = Match.query.filter(Match.id==request.args.get('match')).first()
# 	if request.args.get('response'):
# 		match.receiver
# 	else:
# 		db.session.delete(match)
# 		db.session.commit()