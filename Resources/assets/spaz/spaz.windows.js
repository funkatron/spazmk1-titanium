var Spaz; if (!Spaz) Spaz = {};

/***********
Spaz.Prefs
************/
if (!Spaz.Windows) Spaz.Windows = {};

Spaz.Windows.windowExitCalled = false;


Spaz.Windows.onWindowActive = function (event) {
	Spaz.dump('Window ACTIVE');
  // if ($('body').focus()) {}
  $('body').addClass('active');
}


Spaz.Windows.onWindowDeactivate = function(event) {
	Spaz.UI.hideTooltips();
  $('body').removeClass('active');
};


Spaz.Windows.windowMinimize = function() {
	Titanium.UI.mainWindow().minimize();
	// if (Spaz.Prefs.get('window-minimizetosystray') && air.NativeApplication.supportsSystemTrayIcon) {
	// 	Titanium.UI.mainWindow().visible = false;
	// }
	return false;
};


Spaz.Windows.windowRestore = function() {
	Spaz.dump('restoring window');
	Spaz.dump('current window state:'+Titanium.UI.mainWindow().displayState);
	//Spaz.dump('id:'+air.NativeApplication.nativeApplication.id);


	// if (Titanium.UI.mainWindow().displayState == air.NativeWindowDisplayState.MINIMIZED) {
	// 	Spaz.dump('restoring window');
	//  		Titanium.UI.mainWindow().restore();
	//  	}
	Spaz.dump('restoring window');
	Titanium.UI.mainWindow().restore();

	Spaz.dump('activating window');
	Titanium.UI.mainWindow().activate();
	// Spaz.dump('ordering-to-front window');
	// Titanium.UI.mainWindow().orderToFront();
	// if (air.NativeApplication) {
	// 	Spaz.dump('activating application');
	// 	air.NativeApplication.nativeApplication.activate();
	// }
};


Spaz.Windows.onAppExit = function(event) 
{
	console.info('Spaz.Windows.windowExitCalled is '+Spaz.Windows.windowExitCalled);
	// 
	// if (Spaz.Windows.windowExitCalled == false) {
	// 	console.info('windowClose was not called');
	// 	Spaz.Windows.windowClose();
	// 	return;
	// }

	$('body').fadeOut(500);
	Spaz.Prefs.savePrefs();
	
	if (event) {
		console.info('onAppExit triggered by event')
		// event.preventDefault();
		// event.stopImmediatePropagation();
	}
	
	Titanium.UI.mainWindow().removeEventListener(air.Event.CLOSING, Spaz.Windows.onWindowClose);
	Titanium.UI.mainWindow().removeEventListener(air.Event.EXITING, Spaz.Windows.windowClose);
	// air.NativeApplication.nativeApplication.removeEventListener(air.Event.EXITING, Spaz.Windows.onAppExit); 
	console.info("i'm exiting the app!");

	// alert('onAppExit');

	

	if (Spaz.Prefs.get('sound-enabled')) {
		Spaz.UI.playSoundShutdown(function() {
			// alert('from the shutdown callback!')
			// window.NativeWindow.close();
			Titanium.App.exit();
		});
	} else {
		console.info('sound not playing');
		Titanium.App.exit();
	}
	
}


Spaz.Windows.onWindowClose = function(event) {
	console.info("i'm closing a window!");
	Spaz.Prefs.savePrefs();
};


/**
* Called when the user closes the main window.
*/
Spaz.Windows.windowClose = function() {
	Spaz.Prefs.savePrefs();
	console.info('calling windowClose');
	Spaz.Windows.windowExitCalled = true;
	Spaz.Windows.onAppExit();
};


Spaz.Windows.makeSystrayIcon = function() {
	// if(air.NativeApplication.supportsSystemTrayIcon) { // system tray on windows
	// 	Spaz.dump('Making Windows system tray menu')
	// 	air.NativeApplication.nativeApplication.icon.tooltip = "Spaz loves you";
	// 	// air.NativeApplication.nativeApplication.icon.menu = Spaz.Menus.createRootMenu();
	// 	var systrayIconLoader = new air.Loader();
	// 	systrayIconLoader.contentLoaderInfo.addEventListener(air.Event.COMPLETE,
	// 	                                                       Spaz.Menus.iconLoadComplete);
	// 	systrayIconLoader.load(new air.URLRequest("images/spaz-icon-alpha_16.png"));
	// 	air.NativeApplication.nativeApplication.icon.addEventListener('click', Spaz.Windows.onSystrayClick);
	// }
};


Spaz.Windows.onSystrayClick = function(event) {
	Spaz.Windows.windowRestore();
	// // TODO replace this with call to Spaz.Windows.windowRestore()
	// Spaz.dump('clicked on systray');
	// Spaz.dump(Titanium.UI.mainWindow().displayState);
	// Spaz.dump('id:'+air.NativeApplication.nativeApplication.id);
	// 
	// if (Titanium.UI.mainWindow().displayState == air.NativeWindowDisplayState.MINIMIZED) {
	// 	Spaz.dump('restoring window');
	//  		Titanium.UI.mainWindow().restore();
	//  	}
	//  	Spaz.dump('activating application');
	//  	air.NativeApplication.nativeApplication.activate() // bug fix by Mako
	// Spaz.dump('activating window');
	// Titanium.UI.mainWindow().activate();
	// Spaz.dump('ordering-to-front window');
	// Titanium.UI.mainWindow().orderToFront();
}


Spaz.Windows.openHTMLUtilityWindow = function(url) {
	
	var options = new air.NativeWindowInitOptions();
	options.systemChrome = air.NativeWindowSystemChrome.STANDARD;
	options.type = air.NativeWindowType.UTILITY;
	
	var windowBounds = new air.Rectangle(200,250,300,400);
	var newWindow = air.HTMLLoader.createRootWindow(true, options, true, windowBounds);
	newWindow.load(new runtime.flash.net.URLRequest(url));
	
}

Spaz.Windows.makeWindowVisible = function(){
	Spaz.dump("making window visible");
	Titanium.UI.mainWindow().setVisible(true);
}
Spaz.Windows.makeWindowHidden = function(){
	Spaz.dump("making window hidden");
	Titanium.UI.mainWindow().setVisible(false);
}
Spaz.Windows.setWindowOpacity = function(percentage) {
	var val  = parseInt(percentage)/100;
	Titanium.UI.mainWindow().setTransparency(val);
}
Spaz.Windows.windowMove = function(){
	// Titanium.UI.mainWindow().startMove();
}
Spaz.Windows.windowResize = function(){
	// Titanium.UI.mainWindow().startResize(air.NativeWindowResize.BOTTOM_RIGHT);
}


Spaz.Windows.resetPosition = function() {
	Titanium.UI.mainWindow().setX(Spaz.Prefs.defaultPreferences['window-x']);
	Titanium.UI.mainWindow().setY(Spaz.Prefs.defaultPreferences['window-y']);
	console.info(Spaz.Prefs.defaultPreferences['window-x'] +"x"+Spaz.Prefs.defaultPreferences['window-y']);
	console.info(Titanium.UI.mainWindow().getX() +"x"+Titanium.UI.mainWindow().getY());
	Spaz.Windows.onWindowMove();
	
	Titanium.UI.mainWindow().setWidth(Spaz.Prefs.defaultPreferences['window-width']);
	Titanium.UI.mainWindow().setHeight(Spaz.Prefs.defaultPreferences['window-height']);
	console.info(Spaz.Prefs.defaultPreferences['window-width'] +"x"+Spaz.Prefs.defaultPreferences['window-height']);
	console.info(Titanium.UI.mainWindow().getWidth() +"x"+Titanium.UI.mainWindow().getHeight());
	Spaz.Windows.onWindowResize();
}


Spaz.Windows.onWindowResize = function() {
	Spaz.Prefs.set('window-width', Titanium.UI.mainWindow().getWidth());
	Spaz.Prefs.set('window-height', Titanium.UI.mainWindow().getHeight());
};

Spaz.Windows.onWindowMove = function() {
	Spaz.Prefs.set('window-x', Titanium.UI.mainWindow().getX());
	Spaz.Prefs.set('window-y', Titanium.UI.mainWindow().getY());	
};