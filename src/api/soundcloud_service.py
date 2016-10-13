import lib.soundcloud as soundcloud
import json

class SoundcloudService:

	def __init__(self, client_id):
		self.client_id = client_id
		self.client = soundcloud.Client(client_id=client_id)

	def fetch_music(self, genres):
		tracks = self.client.get('/tracks', genres=genres, favoritings_count=500000)
		client_id_param = '?client_id=' + self.client_id
		
		tracks_json = []
		
		for track in tracks:
			artwork_url = track.artwork_url
			if artwork_url is not None:
				artwork_url = artwork_url.replace('large', 't500x500')
		
			track_json = {
				"id" : track.id,
				"title" : track.title,
				"artist" : track.user['username'],
				"genre" : track.genre,
				"duration" : track.duration,
				"artwork_url" : artwork_url,
				"soundcloud_url" : track.permalink_url,
				"stream_url" : track.stream_url + client_id_param
			}
			
			tracks_json.append(track_json)
		
		return json.dumps(tracks_json)