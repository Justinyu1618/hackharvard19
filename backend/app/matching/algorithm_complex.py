# spaCy v2.2.0 · Python 3
import spacy
from spacy.symbols import nsubj, VERB, NOUN


# Load the pre-installed spacy model
nlp = spacy.load('en_core_web_md')



# User input: List of interests (elements)
# Example

# TODO
# Future iterations should noun chunk to seperate out the rest of the adjuncts

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
ent_a = [[token.pos_ for token in element] for element in a]
ent_x = [[token.pos_ for token in element] for element in x]
ent_y = [[token.pos_ for token in element] for element in y]
ent_z = [[token.pos_ for token in element] for element in z]

entries = [ent_a, ent_x, ent_y, ent_z]
print(entries)
print()



# Clean Data:

# Define some parameters  
noise_tag = ["PROP", "ADP", "DET"]
vec = []

for element in a:
    for token in element:
        if token.pos_ in noise_tag:
            print("hi")
        else:
             v_a = [[token.vector for token in element] for element in a]
print(v_a)
            


# # Function to check if the token is a noise or not  
# def isNoise(token):     
#     is_noise = False
#     if token.pos_ in noise_tag:
#         is_noise = True 
#     elif token.is_stop == True:
#         is_noise = True
#     return is_noise

# def cleanup(token, lower = True):
#     if lower:
#        token = token.lower()
#     return token.strip()

# #Cleaned data
# # cleaned_a = [[cleanup(element.string) for element in a if not isNoise(element)]]
# # cleaned_x = [[cleanup(element.string) for element in x if not isNoise(element)]]
# # cleaned_y = [[cleanup(element.string) for element in y if not isNoise(element)]]
# # cleaned_z = [[cleanup(element.string) for element in z if not isNoise(element)]]


# cleaned_a = [[cleanup(token.string) for token in element] for element in a if not isNoise(element)]
# print(cleaned_a)



# # Individual vector values for each entry of interest by user
# # If element has more than one token, then we must weight and "merge" them into one vector
# # TODO
# # Here, noun is prioritized over verb if user input was verb + noun --> (0.5(verb)*noun)1.5
# # Must test and fine-tune the values

# v_a = [[token.vector for token in element] for element in a]
# v_x = [[token.vector for token in element] for element in x]
# v_y = [[token.vector for token in element] for element in y]
# v_z = [[token.vector for token in element] for element in z]


# vectors = [v_a, v_x, v_y, v_z]
# print(vectors)
# print()





# noun = 1
# verb = 0.3
# rest = 0







# Calculate cosine distance:




# for ent in entries:
#     for element in ent:
#         if len(element) != 1:
#             vector = (0.5*element[0].token.vector + element[1].token.vector)/1.5
#         else:
#             vector = element.token.vector_norm
#     print(vector)

