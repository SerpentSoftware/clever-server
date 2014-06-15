function setupCloseButton() {
    var button = document.getElementById( "close" )
    button.onmouseover = function() {
        button.src = "assets/images/close_hover.png";
    }
    button.onmouseout = function() {
        button.src = "assets/images/close.png";
    }
    button.onclick = function() {
        var win = gui.Window.get();
        win.hide();
    }
};

function initMenuBar() {
    setupCloseButton();
}
