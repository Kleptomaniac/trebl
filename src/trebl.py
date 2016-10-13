import lib.soundcloud as soundcloud

class MusicAggregator:

	def __init__(self, soundcloud_id):
		self.client = soundcloud.Client(client_id=soundcloud_id)
		
	def search(self, genres):
		return self.client.get('/tracks', genres=genres)