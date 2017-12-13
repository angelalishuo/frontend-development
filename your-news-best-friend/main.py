# libraries to import

import sys, json, webbrowser, jinja2, os, webapp2

# to handle errors

if sys.version[0] == '2':
    import urllib2
    import urllib
    from urllib import urlencode
    def safeGet(url):
        try:
            return urllib2.urlopen(url)
        except urllib2.HTTPError as e:
            print("The server couldn't fulfill the request.")
            print("Error code: ", e.code)
        except urllib2.URLError as e:
            print("We failed to reach a server")
            print("Reason: ", e.reason)
        return None

else:
    import urllib.request
    import urllib.error, urllib.parse
    from urllib.parse import urlencode
    def safeGet(url):
        try:
            return urllib.request.urlopen(url)
        except urllib.error.HTTPError as e:
            print("The server couldn't fulfill the request.")
            print("Error code: ", e.code)
        except urllib.error.URLError as e:
            print("We failed to reach a server")
            print("Reason: ", e.reason)
        return None


# to prettify json output

def pretty(obj):
    return json.dumps(obj, sort_keys=True, indent=2)

api_key = '33d0df534c694b96bd5171ae4b8b6011'
baseurl = 'https://newsapi.org/v2/top-headlines?'

# news class to store information

class News():
    def __init__(self, newsdict):
        self.title = newsdict['title']
        self.description = newsdict['description']
        self.url = newsdict['url']
        self.image = newsdict['urlToImage']


# ny times

def general(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'the-new-york-times'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

generalarticles = general()['articles']
generalheadlines = [News(news) for news in generalarticles]


# science 

def newscientist(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'new-scientist'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

sciencearticles = newscientist()['articles']
scienceheadlines = [News(news) for news in sciencearticles]


# national geographic

def natgeonews(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'national-geographic'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    # print(url)
    return json.loads(safeGet(url).read())

natgeoarticles = natgeonews()['articles']
natgeoheadlines = [News(news) for news in natgeoarticles]


# business

def financialtimes(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'bloomberg'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

financearticles = financialtimes()['articles']
financeheadlines = [News(news) for news in financearticles]


# sports 

def sports(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'talksport'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

sportsarticles = sports()['articles']
sportsheadlines = [News(news) for news in sportsarticles]


# entertainment 

def entertainment(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'buzzfeed'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

entertainmentarticles = entertainment()['articles']
entertainmentheadlines = [News(news) for news in entertainmentarticles]


# tech 

def techcrunch(params={}):
    params['apiKey'] = api_key
    params['sources'] = 'techcrunch'
    if format == "json": params["nojsoncallback"]=True
    url = baseurl + urlencode(params)
    print(url)
    return json.loads(safeGet(url).read())

techarticles = techcrunch()['articles']
techheadlines = [News(news) for news in techarticles]


# app engine

JINJA_ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),extensions=['jinja2.ext.autoescape'],autoescape=True)
class MainHandler(webapp2.RequestHandler):
    def get(self):
        #gather data into tempatevals dictionary
        results = {'World': generalheadlines,
                   'Science': scienceheadlines, 
                   'Geography': natgeoheadlines, 
                   'Business': financeheadlines,
                   'Sports': sportsheadlines, 
                   'Technology': techheadlines,      
                   'Entertainment': entertainmentheadlines} 
        templatevals = {"results": results}
        template =  JINJA_ENVIRONMENT.get_template('newstemplate.html')
        self.response.write(template.render(templatevals))

application = webapp2.WSGIApplication([('/', MainHandler)], debug=True)

    