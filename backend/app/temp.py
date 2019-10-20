
class Lol:
	hi = 1
	bye = 2
	cry = 3
	def meh(self):
		print([attr for attr in dir(self) if not callable(getattr(self, attr)) and not attr.startswith("__")])

l = Lol()
l.meh()
print(l.bye)
setattr(l, "bye", 5)
print(l.bye)