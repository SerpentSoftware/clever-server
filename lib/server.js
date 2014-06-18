var JB = require( "jabber-server" ),
    ip = require('ip'),
    jsSHA = require("node-sha256").jsSHA;

var main_password = "dac260420b27c34115f2e8f8284784f3afbe5f72325c5913c6b5082729e63ee9";
var salt = "michael9"

exports.getHash = function( string ) {
    var shaObj = new jsSHA( string + salt, "TEXT" );
    return shaObj.getHash( "SHA-256", "HEX" );
}

JB.User.prototype.authenticate = function( opts ) {
    var hashed_password = exports.getHash( opts.password );

    if( hashed_password == main_password ) {
        console.log("Authenticate Success");
        return true;
    }
    return false;
}

exports.ip = ip.address();
exports.port = 5223;

exports.startServer = function( username, password ) {
    main_password = password;
    var main_user = new JB.User( username, "Main User" );
    console.log( "creating user " + username + " " + main_user.jid.toString()  )

    JB.Server.prototype.initUserList = function( ) {
        return [ main_user ];
    }

    var server = new JB.Server({ domain: ip.address(), port: 5223 });

    server.on( 'registration-success', function( user ) {
        console.log( "registration" + user.getKey() );

        main_user.addBuddy( user );
    } );

    return server;
}
exports.password = main_password;
