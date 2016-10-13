from google.appengine.ext import ndb

#class TreblPlaylist(ndb.Model):
#	id = ndb.IntegerProperty()
#	name = ndb.StringProperty()
	
class TreblPlaylistItem(ndb.Model):
	playlist_name = ndb.StringProperty()
	track_id = ndb.IntegerProperty()
	#track_number = ndb.IntegerProperty()