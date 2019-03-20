const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

/* Set up the app. */

app.use( express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

/* Set up the routes. */

app.use('/weather', require('./routes/weather.js'));
app.use('/background', require('./routes/background.js'));

app.get('/', function( req, res ) {
  res.setHeader('Content-Type', 'application/json');
  res.end( JSON.stringify( {
    error: 'nothing here'
  } ) );
});

const listener = app.listen(process.env.PORT, function() {
  console.log( 'Your app is listening on port ' + listener.address().port );
});
