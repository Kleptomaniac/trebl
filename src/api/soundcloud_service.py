import lib.soundcloud as soundcloud
import json

from datastore.soundcloud_datastore import SoundcloudTrack
from datastore.trebl_datastore import TreblPlaylistItem

class SoundcloudService:

	def __init__(self, client_id):
		self.client_id = client_id
		self.client = soundcloud.Client(client_id = client_id)

	def fetch_music(self, genres, limit):
		tracks = []
	
		track_request = self.client.get('/tracks', genres = genres, 
			limit = 100)
		client_id_param = '?client_id=' + self.client_id
		
		for track in track_request:
			artwork_url = track.artwork_url
			if artwork_url is not None:
				artwork_url = artwork_url.replace('large', 't500x500')
			stream_url = track.stream_url + client_id_param
		
			track_data = SoundcloudTrack(
				id = track.id,
				title = track.title,
				artist = track.user['username'],
				genre = track.genre,
				duration = track.duration,
				artwork_url = artwork_url,
				soundcloud_url = track.permalink_url,
				stream_url = stream_url)
			track_data.put()
			
			tracks.append(track_data)
		
		return tracks
		
	def fetch_tracks(self, playlist_name, genres, limit):
		playlist = []
	
		separated_genres = genres.split(',')
		track_query = SoundcloudTrack.gql('WHERE genre IN :1', 
			separated_genres)
		
		playlist_query = TreblPlaylistItem.gql('WHERE playlist_name = :1', 
			playlist_name)
		playlist_item_ids = [playlist.track_id for playlist in playlist_query]
		
		tracks = list(track_query)
		if not tracks:
			tracks = self.fetch_music(genres, limit)
		
		for track in tracks:
			if len(playlist) == limit:
				break
		
			if track.id not in playlist_item_ids:
				playlist_item = TreblPlaylistItem(
					playlist_name = playlist_name,
					track_id = track.id
				)
				playlist_item.put()
				
				playlist.append(track.to_dict())
		
		return json.dumps(playlist)