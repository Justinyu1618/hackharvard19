# spaCy v2.2.0 · Python 3

# Before running the program:
# pip3 install -U spacy
# python3 -m spacy download en_core_web_md
#
# If pip install fails, pip uninstall and try conda install
#

import spacy
from spacy.symbols import nsubj, VERB, NOUN


# Load the pre-installed spacy model
nlp = spacy.load('en_core_web_md')



# User input: List of interests (elements)
# Example inputs...
# user_a, main user
a = [nlp(u'play football'), nlp(u'study biology'), nlp(u'build a computer')]

# user_x, no match
x = [nlp(u'fashion'), nlp(u'listen to music'), nlp(u'discuss politics')]

# user_y, weak match
y = [nlp(u'play golf'), nlp(u'study math'), nlp(u'play piano')]

# user_z, perfect match
z = [nlp(u'play football'), nlp(u'study biology'), nlp(u'build a computer')]

alles = [a, x, y, z]



# Part-of-speech (POS) Tagging
# Determinds the part of speech of each token / word inputted by the user
# Check for adjuncts and remove
noise_tag = ["PROP", "ADP", "DET"] #adjuncts

# "raw line", before cleaning... only used for debug purposes
raw_a = [[token.pos_ for token in element] for element in a]
raw_x = [[token.pos_ for token in element] for element in x]
raw_y = [[token.pos_ for token in element] for element in y]
raw_z = [[token.pos_ for token in element] for element in z]

# "cleaned", removed all adjuncts
pos_a = [[token.pos_ for token in element if token.pos_ not in noise_tag] for element in a]
pos_x = [[token.pos_ for token in element if token.pos_ not in noise_tag] for element in x]
pos_y = [[token.pos_ for token in element if token.pos_ not in noise_tag] for element in y]
pos_z = [[token.pos_ for token in element if token.pos_ not in noise_tag] for element in z]

# print statements for debugging, may be removed or commented
print ("User A:")
print (raw_a)
print (pos_a)
print ()

print ("User X:")
print (raw_x)
print (pos_x)
print()

print ("User Y:")
print (raw_y)
print (pos_y)
print()

print ("User Z:")
print (raw_z)
print (pos_z)
print()



# Individual vector values for each entry of interest by user
# If element has more than one token, then we must weight and "merge" them into one vector
# TODO
# Here, arbitrary weights are defined, not yet used. Must test and fine-tune the values

# Arbitrary weights
# noun = 1
# verb = 0.3
# rest = 0

# vectors of the non adjunct values
# currently adds values together

vec_a = []
for element in a:
    for token in element:
        # if len(element) > 1:
        #     if token.pos_ not in noise_tag:
        #         vec_a.extend(element[0] + element[1])
        # else:
            vec_a.extend(token.vector)

vec_x = []
for element in x:
    for token in element:
        # if len(element) > 1:
        #     if token.pos_ not in noise_tag:
        #         vec_x.extend(element[0] + element[1])
        # else:
            vec_x.extend(token.vector)

vec_y = []
for element in y:
    for token in element:
        # if len(element) > 1:
        #     if token.pos_ not in noise_tag:
        #         vec_y.extend(element[0] + element[1])
        # else:
            vec_y.extend(token.vector)

vec_z = []
for element in z:
    for token in element:
        # if len(element) > 1:
        #     if token.pos_ not in noise_tag:
        #         vec_z.extend(element[0] + element[1])
        # else:
            vec_z.extend(token.vector)

print ("Vector A:")
print (vec_a)
print()

print ("Vector X:")
print (vec_x)
print()

print ("Vector Y:", vec_y)
print (vec_y)
print()

print ("Vector Z:", vec_z)
print (vec_z)
print()

# vec_a = [[token.vector for token in element if token.pos_ not in noise_tag] for element in a]
# vec_x = [[token.vector for token in element if token.pos_ not in noise_tag] for element in x]
# vec_y = [[token.vector for token in element if token.pos_ not in noise_tag] for element in y]
# vec_z = [[token.vector for token in element if token.pos_ not in noise_tag] for element in z]
# vectors = [vec_a , vec_x, vec_y, vec_z]
# print(vectors)
# print()


# TODO - implement the following after the above loop issue is fixed

# # Calculate cosine distance and compare

# #Individual vectors
# v_a = [[token.vector for token in element] for element in a]
# v_x = [[token.vector for token in element] for element in x]
# v_y = [[token.vector for token in element] for element in y]
# v_z = [[token.vector for token in element] for element in z]

# vec_compare = [v_x, v_y, v_z]
# print(vec_compare)
# print()


# # Vector comparison
# # Compare each of user_a's interest with other users

# compare_x = []
# compare_y = []
# compare_z = []

# for element in a:
#     for token_a in element:
#         compare_x.extend([[token_a.similarity(token_x) for token_x in element] for element in x])
#         compare_y.extend([[token_a.similarity(token_y) for token_y in element] for element in y])
#         compare_z.extend([[token_a.similarity(token_z) for token_z in element] for element in z])


# print("compare a and x")
# print(compare_x)
# print()

# print("compare a and y")
# print(compare_y)
# print()

# print("compare a and z")
# print(compare_z)
# print()
# # print(compare_x, compare_y, compare_z)


# # Aggregate sum of each comparison above
# score_x = []
# score_y = []
# score_z = []
# num = len(compare_x)

# score_x = [sum(i) for i in zip(*compare_x)]
# score_y = [sum(i) for i in zip(*compare_y)]
# score_z = [sum(i) for i in zip(*compare_z)]

# # Average
# # Must take the average as n of example may vary in real cases
# score_x = score_x[0] / num
# score_y = score_y[0] / num
# score_z = score_z[0] / num

# print("score of x")
# print(score_x)
# print()

# print("score of y")
# print(score_y)
# print()

# print("score of z")
# print(score_z)
# print()
# #print(score_x, score_y, score_z)

# print("Expectation: x = no match, y = weak match, z = perfect match")
