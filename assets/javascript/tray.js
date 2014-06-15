// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new gui.Tray({ icon: 'assets/image/close.png' });

var menu = new gui.Menu();

var nameItem = new gui.MenuItem( { label: 'Clever SMS', enabled: false } );
menu.append( nameItem );


var openItem = new gui.MenuItem( { label: "Open Window" } )
openItem.click = function() {
    var win = gui.Window.get();
    win.show();
}
menu.append( openItem );

tray.menu = menu;
