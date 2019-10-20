from app.models import User, Match
import random


THRESHOLD = 0.5 #arbitrary

def calculate_matches(user):
	"""Given a user object, return a list of matches, ordered by score"""
	
	#me calculating random stuff
	all_users = User.query.filter(User.id != user.id).all()
	print(all_users)
	target_users = random.sample(all_users,1)
	ret = []
	for target in target_users:
		match = Match()
		data = {'sender_id': user.id, 
				'target_id': target.id,
				'score': random.random()}
		match.populate(data)
		ret.append(match)
	return ret