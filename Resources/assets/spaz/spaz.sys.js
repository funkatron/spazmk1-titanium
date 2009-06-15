var Spaz; if (!Spaz) Spaz = {};


if (!Spaz.Sys) Spaz.Sys = {};


Spaz.Sys.getVersion = function() {
	return Titanium.App.getVersion();
};



Spaz.Sys.initUserAgentString = function() {
	// window.htmlLoader.userAgent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Spaz/' + Spaz.Sys.getVersion();
	// // air.URLRequestDefaults.userAgent = air.HTMLLoader.userAgent
	// console.info(window.htmlLoader.userAgent)
	// return window.htmlLoader.userAgent
};
Spaz.Sys.getUserAgent = function() {
	// return window.htmlLoader.userAgent
};
Spaz.Sys.setUserAgent = function(uastring) {
	// window.htmlLoader.userAgent = uastring
	// // air.URLRequestDefaults.userAgent = uastring
	// return window.htmlLoader.userAgent
};

Spaz.Sys.isWindows = function() {
	return (Titanium.Platform.name.search(/Windows/gi) > -1);
};
Spaz.Sys.isMac = function() {
	return (Titanium.Platform.name.search(/Mac OS/gi) > -1);
};
Spaz.Sys.isLinux = function() {
	return (Titanium.Platform.name.search(/Linux/gi) > -1);
};


Spaz.Sys.initNetworkConnectivityCheck = function() {
	Spaz.dump('initNetworkConnectivityCheck disabled');

	// var monitor;
	// 
	// var test_url = Spaz.Data.getAPIURL('test');
	// 
	// monitor = new air.URLMonitor( new air.URLRequest( test_url ) );
	// monitor.addEventListener(air.Event.NETWORK_CHANGE, announceStatus);
	// monitor.pollInterval = 30*1000;
	// monitor.start();
	// 
	// function announceStatus(e) {
	// 	Spaz.dump("Network status change. Current status: " + monitor.available);
	// 	console.info("Network status change. Current status: " + monitor.available);
	// }
};


Spaz.Sys.initMemcheck = function() {
	Spaz.dump('Memcheck disabled');

	// t = new air.Timer(15*1000, 0);
	// t.addEventListener(air.TimerEvent.TIMER, memCheckGC);
	// t.start();
	// 
	// // console.info("Running!"+t.running);
	// 
	// function memCheckGC(e) {
	// 	// console.info("memcheck event");
	// 	Spaz.dump("air.System.totalMemory:"+air.System.totalMemory);
	// 	// air.System.gc();
	// 	// console.info("post mem:"+air.System.totalMemory);
	// }
};


Spaz.Sys.getRuntimeInfo = function(){
	return ret ={
		os : Titanium.Platform.name,
		version: Spaz.Sys.getVersion(), 
		manufacturer: null,
		totalMemory: null,
		
	};
}






Spaz.Sys.getClipboardText = function() {
	if(air.Clipboard.generalClipboard.hasFormat("text/plain")){
	    var text = air.Clipboard.generalClipboard.getData("text/plain");
		return text;
	} else {
		return '';
	}
}

Spaz.Sys.setClipboardText = function(text) {
	Spaz.dump('Copying "' + text + '" to clipboard');
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT,text,false);
}


Spaz.Sys.getFileContents = function(path) {
	var f = Titanium.Filesystem.getFile(path);
	if (f.exists()) {
		var str = f.read().toString();
		return str;
	} else {
		return false;
	}

};


/*
	@TODO: should really wrap the business end of this in a try/catch
*/
Spaz.Sys.setFileContents = function(path, content, serialize) {
	
	if (serialize) {
		content = JSON.stringify(content);
	}
	
	Spaz.dump('setFileContents for '+path+ ' to "' +content+ '"');
	
	var f = Titanium.Filesystem.getFile(path);
	f.write(content);
};



Spaz.Sys.openInBrowser = function(url) {	
	Titanium.Desktop.openURL(url);
};



Spaz.Sys.openAppStorageFolder = function() {
	Spaz.Sys.openInBrowser('file://'+Titanium.Filesystem.getApplicationDataDirectory().nativePath);
};


Spaz.Sys.loadChildInterface = function() {
	Spaz.Sys.ClassicSB = $("#classicSB")[0].contentWindow.childSandboxBridge;
};

/***********
Spaz.Bridge
************/
if (!Spaz.Bridge) Spaz.Bridge = {};

