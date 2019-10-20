# Matching algorithm for Bump
# spaCy v2.2.0 · Python 3
#
#


import spacy
from math import exp, log
# Load the pre-installed spacy model
nlp = spacy.load('en_core_web_md')



# User input: List of interests (elements)
# Here, assume that user input is simply noun

# user_a, main user
a = [nlp(u'football'), nlp(u'study'), nlp(u'computers')]

# user_x, expected no match
x = [nlp(u'fashion'), nlp(u'design'), nlp(u'politics')]

# user_y, expected weak match
y = [nlp(u'golf'), nlp(u'study'), nlp(u'phone')]

# user_z, expected perfect match
z = [nlp(u'football'), nlp(u'study'), nlp(u'computers')]



# Calculate cosine distance and compare

#Individual vectors
v_a = [[token.vector for token in element] for element in a]
v_x = [[token.vector for token in element] for element in x]
v_y = [[token.vector for token in element] for element in y]
v_z = [[token.vector for token in element] for element in z]

vec_compare = [v_x, v_y, v_z]
print(vec_compare)
print()


# Vector comparison
# Compare each of user_a's interest with other users

compare_x = []
compare_y = []
compare_z = []

for element in a:
    for token_a in element:
        compare_x.extend([[token_a.similarity(token_x) for token_x in element] for element in x])
        compare_y.extend([[token_a.similarity(token_y) for token_y in element] for element in y])
        compare_z.extend([[token_a.similarity(token_z) for token_z in element] for element in z])


print("compare a and x")
print(compare_x)
print()

print("compare a and y")
print(compare_y)
print()

print("compare a and z")
print(compare_z)
print()
# print(compare_x, compare_y, compare_z)


# Aggregate sum of each comparison above
score_x = []
score_y = []
score_z = []
num = len(compare_x)

score_x = [sum(i) for i in zip(*compare_x)]
score_y = [sum(i) for i in zip(*compare_y)]
score_z = [sum(i) for i in zip(*compare_z)]

# Average
# Must take the average as n of example may vary in real cases
score_x = score_x[0] / num
score_y = score_y[0] / num
score_z = score_z[0] / num

print("score of x")
print(score_x)
print()

print("score of y")
print(score_y)
print()

print("score of z")
print(score_z)
print()
#print(score_x, score_y, score_z)

print("Expectation: x = no match, y = weak match, z = perfect match")


# Compare
