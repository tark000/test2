var express = require( "express" );
var path = require( "path" );
var childProcess = require( "child_process" );
var phantomjs = require( "phantomjs" );
var binPath = phantomjs.path;
var app = express();

app.use( express.static( '../../public' ) );
/*app.use(function(req, res, next){

    next();
});*/

app.listen( 3000 );

app.get( /^(.*)\/?$/i, function( request, response ) {

    var script = path.join( __dirname, "get_html.js" );

    var url = "http://new.dorohouse.com.ua/" + request.url.replace( "/snapshot/?_escaped_fragment_=", "#!" );

    childProcess.execFile(binPath, [script, url], function(error, stdout, stderr){

        response.writeHead( 200, {
            "Content-Type": "text/html; charset=UTF-8"
        } );
        response.end( "<!doctype html><html>" + stdout + "</html>" );
    });

} );

