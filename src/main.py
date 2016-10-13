import trebl
import webapp2

class TreblHomepage(webapp2.RequestHandler):
	def get(self):
		self.response.headers['Content-Type'] = 'text/plain'
		
		aggregator = trebl.MusicAggregator('abb8aaa6f8eb967699ff2dfedafcdd3f')
		tracks = aggregator.search('techno')

		trackListing = ""
		for track in tracks:
			trackListing += track.title + "\n"
		
		self.response.write(trackListing)
		
app = webapp2.WSGIApplication([
	('/', TreblHomepage),
], debug=True)