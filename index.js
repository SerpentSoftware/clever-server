var server = require( "./lib/server" )

var win = require('nw.gui').Window.get();
win.setResizable( false );

function startServer( username, password ) {
    var JB = server.startServer( username, password );

    JB.on( 'online', function() {
        var server_ip = document.getElementById( "server_ip" );
        server_ip.innerHTML = server.ip;

        var server_ip = document.getElementById( "server_port" );
        server_ip.innerHTML = server.port;
    } );
}

window.onload = function() {
    var username = null;
    var password = null;
    var main_account_username_field = document.getElementById( "account_username" );
    var main_account_password_field = document.getElementById( "account_password" );

    // TODO: Should try to load username/password from settings file

    if( username != null && password != null ) {
        main_account_username_field = username;
        main_account_password_field = "michael9";
        main_account_username_field.disabled = true;
        main_account_password_field.disabled = true;
        startServer( username, password );
    }

    var main_account_button = document.getElementById( "account_submit" );
    main_account_button.onclick = function() {
        if( main_account_username_field.value != "" && main_account_username_field.value != null &&
            main_account_password_field.value != "" && main_account_password_field.value != null ) {
            username = main_account_username_field.value;

            if( !(new String(username)).indexOf( "@" ) != -1 ) {
                username = username + "@clever";
                main_account_username_field.value = username;
            }

            password = main_account_password_field.value;

            startServer( username, password );

            main_account_username_field.disabled = true;
            main_account_password_field.disabled = true;
            main_account_button.innerHTML = "Edit Account";
        }
    };

    initMenuBar();
}
