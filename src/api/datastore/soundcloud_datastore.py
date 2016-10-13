from google.appengine.ext import ndb

class SoundcloudTrack(ndb.Model):
	id = ndb.IntegerProperty()
	title = ndb.StringProperty()
	artist = ndb.StringProperty()
	genre = ndb.StringProperty()
	duration = ndb.IntegerProperty()
	artwork_url = ndb.StringProperty()
	soundcloud_url = ndb.StringProperty()
	stream_url = ndb.StringProperty()
	
	def to_dict(self):
		track = {}
		for key, property in self._properties.iteritems():
			track[key] = getattr(self, key)

		return track