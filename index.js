var server = require( "./lib/server" ),
    fs = require( 'fs' ),
    gui = require( 'nw.gui' );

var JB = null;
var username = null;
var password = null;
var main_account_username_field;
var main_account_password_field;
var main_account_button;

var win = require('nw.gui').Window.get();
win.setResizable( false );

function startServer( username, password ) {
    JB = server.startServer( username, password );

    JB.on( 'online', function() {
        var server_ip = document.getElementById( "server_ip" );
        server_ip.innerHTML = server.ip;

        var server_ip = document.getElementById( "server_port" );
        server_ip.innerHTML = server.port;
    } );
}

function stopServer() {
    if( JB != null ) {
        JB.shutdown( function() {
            var server_ip = document.getElementById( "server_ip" );
            server_ip.innerHTML = "No Server Running";

            var server_ip = document.getElementById( "server_port" );
            server_ip.innerHTML = "No Server Running";
        } );
    }
}

var CONFIG_NAME = "clever_config.json";

function getSettingsFilePath() {
    var settings_path;
    if( process.platform == 'darwin' ) {
        var home = process.env[ "HOME" ]
        settings_path = home + "/Library/Application Support/" + gui.App.manifest.name + "/";
    }
    try {
        fs.mkdirSync( settings_path, 0766, function( err ) {} );
    } catch (err) {}
    console.log( "Settings File Path" + settings_path + CONFIG_NAME );
    return settings_path + CONFIG_NAME;
}

function loadSettingsSync() {
    try {
        var data = fs.readFileSync(getSettingsFilePath()),
            settingsObj;
        settingsObj = JSON.parse(data);
        username = settingsObj["username"];
        password = settingsObj["password"];
    } catch (err) {
        console.log('There has been an error parsing your JSON.')
        console.log(err);
    }
}

function saveSettingsSync() {
    var options = { "username": username,
                    "password": password }
    var data = JSON.stringify(options);

    fs.writeFile(getSettingsFilePath(), data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        };
        // console.log( 'Configuration saved successfully.' )
    });
}

function createAccount() {
    if( main_account_username_field.value != "" && main_account_username_field.value != null &&
        main_account_password_field.value != "" && main_account_password_field.value != null ) {
        console.log( "createAccount" );
        username = main_account_username_field.value;

        if( username.indexOf( "@" ) == -1 ) {
            username = username + "@clever";
            main_account_username_field.value = username;
        }

        password = server.getHash( main_account_password_field.value );

        startServer( username, password );

        main_account_username_field.disabled = true;
        main_account_password_field.disabled = true;
        main_account_button.innerHTML = "Edit Account";
        main_account_button.onclick = editAccount;

        saveSettingsSync();
    }
}

function editAccount() {
    console.log( "saveAccount" );
    stopServer();

    main_account_username_field.disabled = false;
    main_account_password_field.disabled = false;
    main_account_password_field.value = "";
    main_account_button.innerHTML = "Save Account";
    main_account_button.onclick = createAccount;
}

window.onload = function() {
    main_account_username_field = document.getElementById( "account_username" );
    main_account_password_field = document.getElementById( "account_password" );
    main_account_button = document.getElementById( "account_submit" );
    main_account_button.onclick = createAccount;

    loadSettingsSync();
    if( username != null && password != null ) {
        main_account_username_field.value = username;
        main_account_password_field.value = "michael9";

        main_account_username_field.disabled = true;
        main_account_password_field.disabled = true;
        main_account_button.innerHTML = "Edit Account";
        main_account_button.onclick = editAccount;

        startServer( username, password );
    }

    initMenuBar();
}
