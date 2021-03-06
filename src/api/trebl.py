from soundcloud_service import SoundcloudService
import webapp2

class TreblService(webapp2.RequestHandler):

	def __init__(self, request = None, response = None):
		super(TreblService, self).__init__(request, response)
	
		# Client ID for registered Soundcloud Trebl app
		self.SOUNDCLOUD_CLIENT_ID = 'abb8aaa6f8eb967699ff2dfedafcdd3f'
		self.soundcloud = SoundcloudService(self.SOUNDCLOUD_CLIENT_ID)
	
	def get(self):
		function = self.request.get('function')
		
		if (function == 'fetch_music'):
			playlist = self.request.get('playlist')
			tags = self.request.get('tags')
			
			limit = self.request.get('limit')
			if limit == '':
				limit = 10

			tracks = self.soundcloud.fetch_tracks(playlist, tags, limit)
			
			self.response.write(tracks)
	
# Initialise Trebl API request handler	
app = webapp2.WSGIApplication([
	('/api', TreblService),
], debug=True)