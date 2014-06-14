var JB = require( "jabber-server" );

JB.Server.prototype.initUserList = function( ) {
    var main_user = new JB.User( "main@clever", "Main User" );
    var android_user = new JB.User( "android@clever", "Android User" );
    var kocsy = new JB.User( "kocsy@clever", "Kocsy" );

    main_user.addBuddy( android_user );
    main_user.addBuddy( kocsy );

    android_user.addBuddy( main_user );
    android_user.addBuddy( kocsy );

    kocsy.addBuddy( android_user );
    kocsy.addBuddy( main_user );
    return [ main_user, android_user, kocsy ];
}

var server = new JB.Server({ domain: "10.0.0.16", port: 5223 });
