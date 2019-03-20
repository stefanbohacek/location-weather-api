/*
  yourapp.glitch.me/background
*/

var express = require( 'express' ),
    router = express.Router(),
    request = require( 'request' ),
    authMiddleware = require( '../middleware/authentication.js' );

router.get('/', authMiddleware(), function (req, res) {
  let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      weather = req.query.weather || req.body.weather,
      latitude = req.query.latitude || req.body.latitude,
      longitude = req.query.longitude || req.body.longitude;
  
  if ( ipAddress.indexOf( ',' ) > -1 ){
    ipAddress = ipAddress.split( ',' )[0];
  }

  const ipApiUrl = `http://ip-api.com/json/${ipAddress}`;

  try{
    let data = {};

    const flickrApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ process.env.FLICKR_API_KEY }&lat=${ latitude }&lon=${ longitude }&accuracy=1&tags=${ weather }&sort=relevance&extras=url_l&format=json`;

    request( flickrApiUrl, function ( flickrApiErr, flickrApiRes, flickrApiBody) {
      if ( !flickrApiErr ){
        try{

          var startPos = flickrApiBody.indexOf( '({' );
          var endPos = flickrApiBody.indexOf( '})' );
          var jsonString = flickrApiBody.substring( startPos+1, endPos+1 );
          data = JSON.parse(jsonString);
        } catch ( err ){ /* noop */ }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end( JSON.stringify( data ) );
    });
  } catch ( err ){
    res.setHeader( 'Content-Type', 'application/json' );
    res.status( 500 );
    res.end( JSON.stringify( {
      error: err
    } ) );      
  }
});

module.exports = router;
