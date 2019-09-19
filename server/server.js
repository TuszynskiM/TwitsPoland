const OAuth = require('oauth');
const http = require('http');

const userKey = '9Vi8w5Ix4zqZVWo4opXazKJQF';
const userSecretKey = 'jBqUZ2xA5dmEynf794KPAX5vxkhJUG4KejSXQ6yuCYi5YbkVIT';
const userToken = '1173627841273040898-JKWpClNlKCePOrAwlQ71euvtyF7wdk';
const userSecretToken = 'GGnihXjCxL9ucFmMjWUiZbjIogOAeSbwLS60jVQuXmDRl';

const twitterUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=polska&tweet_mode=extended';

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  userKey,
  userSecretKey,
  '1.0A',
  null,
  'HMAC-SHA1'
);

http.createServer(function (request, response) {
  oauth.get(
    twitterUrl,
    userToken,
    userSecretToken,
    function (error, twitterResponseData, result) {
      const imageLinks = [];

      if (error) {
        console.log(error)
        res.end(JSON.stringify(error));
        return;
      }
      try {
        const twits = JSON.parse(twitterResponseData);

        const dateNow = new Date().getTime();
        //Number 2678400000 is 31 days convert to miliseconds 
        const maxDateRange  = dateNow -2678400000;

        twits.forEach(twit => {
          let postDataToMilisecond = Date.parse(twit.created_at)
          if (typeof twit.extended_entities !== 'undefined' && maxDateRange <= postDataToMilisecond) {
            let twitMedia = twit.extended_entities.media;
            twitMedia.forEach(media => {
              imageLinks.push(media.media_url)
            });
          }
        });
      } catch (parseError) {
        console.log(parseError);
      }
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.end(JSON.stringify(imageLinks));
    });
}).listen(3001)