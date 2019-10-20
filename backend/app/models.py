import json, pprint, enum
from app import db
from app import bcrypt
from datetime import datetime, timedelta
from sqlalchemy.ext import mutable
from flask import Flask
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

#TODO: implement AUTH: https://scotch.io/tutorials/authentication-and-authorization-with-flask-login#toc-user-model
#TODO: Create JSON type decorator: https://www.michaelcho.me/article/json-field-type-in-sqlalchemy-flask-python


#========== UTIL ==========

printer = pprint.PrettyPrinter(indent=4)

class JsonEncodedDict(db.TypeDecorator):
	impl = db.Text
	def process_bind_param(self, value, dialect):
		if value is None:
			return '{}'
		else:
			return json.dumps(value)

	def process_result_value(self, value, dialect):
		if value is None:
			return {}
		else:
			return json.loads(value)

mutable.MutableDict.associate_with(JsonEncodedDict)

class MatchStatus(enum.Enum):
	suggested = 0
	sender_accepted = 1
	receiver_accepted = 2
	finished = 3

default_settings = {"enabled": True, "match_strength": 3}

# rec_association_table = Table('association', Base.metadata,
#     Column('user_id', Integer, ForeignKey('user.id')),
#     Column('match_id', Integer, ForeignKey('match.id'))
# )

# sent_association_table = Table('association', Base.metadata,
#     Column('user_id', Integer, ForeignKey('user.id')),
#     Column('match_id', Integer, ForeignKey('match.id'))
# )

#========== MODELS ==========

class User(db.Model):
	__tablename__ = "user"

	id = db.Column(db.Integer, nullable=False, primary_key=True)
	email = db.Column(db.String(50), nullable=False, unique=True)
	password = db.Column(db.String(100), nullable=False)
	name = db.Column(db.String(1000), nullable=False)
	age = db.Column(db.Integer)
	gender = db.Column(db.String(1))
	description = db.Column(db.String)
	phone_number = db.Column(db.Integer)
	social_media = db.Column(JsonEncodedDict)
	settings = db.Column(JsonEncodedDict)
	interest = db.Column(db.String)
	enabled = db.Column(db.Boolean)
	# sent_bumps = db.relationship('Match')
	# received_bumps = db.relationship('Match')
	# past_matches_sent = db.relationship('Match', back_poplulates="parent")
	# past_matches_received = db.relationship('Match', back_poplulates="parent")
	# sent_matches = db.relationship('Match', back_populates="sender", foreignkeys=[''])
	# received_matches = db.relationship('Match', back_populates="receiver", secondary=rec_association_table)
	matches = db.relationship('Match')
	location = db.Column(db.String)

	def __init__(self, **kwargs):
		super(User, self).__init__(**kwargs)
		self.settings = default_settings

	def populate(self, data):
		member_vars = [attr for attr in dir(self) if not callable(getattr(self, attr)) and not attr.startswith("__")]
		for key, val in data.items():
			if key == 'id':
				print("Cannot change id!")
				pass
			elif key == 'password':
				self.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
			elif key == 'settings':
				for k,v in json.loads(data["settings"]):
					if k in self.settings:
						self.settings[k] = v
			elif key in member_vars:
				setattr(self, key, val)

	def serialize(self):
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Match(db.Model):
	__tablename__ = "match"

	id = db.Column(db.Integer, primary_key=True)
	sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	# receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	# sender = db.relationship("User", back_populates="sent_matches", foreign_keys=[sender_id])
	# receiver = db.relationship("User", back_populates="received_matches", foreign_keys=[receiver_id])
	target_id = db.Column(db.Integer)
	score = db.Column(db.Float, nullable=False)
	start_time = db.Column(db.DateTime, nullable=False)
	end_time = db.Column(db.DateTime)
	status = db.Column(db.String, nullable=False)
	rating = db.Column(db.Boolean)
	trade_contact = db.Column(db.Boolean)
	location = db.Column(db.String())

	def __init__(self, **kwargs):
		super(Match, self).__init__(**kwargs)
		self.start_time = datetime.now()
		self.status = 'suggested'

	def populate(self, data):
		member_vars = [attr for attr in dir(self) if not callable(getattr(self, attr)) and not attr.startswith("__")]
		for key, val in data.items():
			if key == 'id':
				print("Cannot change id!")
				pass
			elif key in member_vars:
				setattr(self, key, val)


	def serialize(self):
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

