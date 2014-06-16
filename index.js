var JB = require( "jabber-server" );

function startServer() {
    var main_user = new JB.User( "main@clever", "Main User" );

    JB.Server.prototype.initUserList = function( ) {
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

    server.on( 'registration-success', function( user ) {
        console.log( "registration" + user.getKey() );

        main_user.addBuddy( user );
    } );
}


var win = require('nw.gui').Window.get();
win.setResizable( false );

window.onload = function() {
    win.showDevTools();
    initMenuBar();

    startServer();
}
