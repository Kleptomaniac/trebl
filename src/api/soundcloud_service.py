import re

import lib.soundcloud as soundcloud
import json

from datastore.soundcloud_datastore import SoundcloudTrack
from datastore.trebl_datastore import TreblPlaylistItem

class SoundcloudService:

	def __init__(self, client_id):
		self.client_id = client_id
		self.client = soundcloud.Client(client_id = client_id)

	def fetch_music(self, tags, limit):
		tracks = []
	
		track_request = self.client.get('/tracks', tags = tags, 
			limit = limit)
		client_id_param = '?client_id=' + self.client_id
		
		for track in track_request:
			artwork_url = track.artwork_url
			if artwork_url is not None:
				artwork_url = artwork_url.replace('large', 't500x500')
			
			stream_url = track.stream_url + client_id_param
			
			tags = []
			if track.tag_list is not None:
				tags = re.findall(r'([^\s\"\\]+)', track.tag_list)
			
			track_data = SoundcloudTrack(
				id = track.id,
				title = track.title,
				artist = track.user['username'],
				tags = tags,
				duration = track.duration,
				artwork_url = artwork_url,
				soundcloud_url = track.permalink_url,
				stream_url = stream_url)
			track_data.put()
			
			tracks.append(track_data)
		
		return tracks
		
	def fetch_tracks(self, playlist_name, tags, limit):
		separated_tags = tags.split(',')
		tracks = list(SoundcloudTrack.gql('WHERE tags IN :1', 
			separated_tags))
		tracks =[]
		if not tracks:
			tracks = self.fetch_music(tags, limit)
		
		if playlist_name == '':
			return json.dumps([track.to_dict() for track in tracks])
		
		playlist = []
		playlist_query = TreblPlaylistItem.gql('WHERE playlist_name = :1', 
			playlist_name)
		playlist_item_ids = [playlist_item.track_id for playlist_item in playlist_query]
		
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