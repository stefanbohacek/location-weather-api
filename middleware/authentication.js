module.exports = function( options ) {
  return function( req, res, next ) {
    const apiKey = req.query.api_key || req.body.api_key;
    
    if ( apiKey && apiKey === process.env.API_KEY ){
      res.setHeader( 'Access-Control-Allow-Origin', process.env.APP_URL );
      res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
      res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' );
      next();
    }
    else{
      res.setHeader( 'Content-Type', 'application/json' );
      res.status( 401 );
      res.end( JSON.stringify( {
        error: 'not authenticated'
      } ) );      
    }
  }
}
