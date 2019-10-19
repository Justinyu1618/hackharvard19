import os
from flask import Flask, session, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt


application = None
db = None
bcrypt = None

def load_from_env(app, *args):
	for a in args:
		app.config[a] = os.environ[a]

def create_app():
	global application, db, bcrypt, session
	application = Flask(__name__, instance_relative_config=True)

	bcrypt = Bcrypt(application)

	#load main config
	application.config.from_pyfile('../config.py') 

	#load instance config
	if os.path.exists(application.instance_path + "/config.py"):
		application.config.from_pyfile('config.py')
		print("Loading secret configs from file")
	else:
		load_from_env(application, 'FLASK_SECRET_KEY',
									'SQLALCHEMY_DATABASE_URI',)
		print("Loading secret configs from env")

	#load CORS support
	cors = CORS(application, supports_credentials=True)	

	#load database
	db = SQLAlchemy(application)
	from app.models import User, Round, Applicant, Score, SkippedApplicant

	#confgure JWT auth
	jwt = JWTManager(application)
	application.config['JWT_SECRET_KEY'] = application.config['FLASK_SECRET_KEY']

	#load Flask secret key
	application.secret_key = application.config['FLASK_SECRET_KEY']

	#register module blueprints
	from app.user.views import user_bp
	from app.user.views import matchin_bp
	application.register_blueprint(user_bp)
	application.register_blueprint(matchin_bp)


	

	db.create_all()

	return application