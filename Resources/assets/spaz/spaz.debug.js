var Spaz; if (!Spaz) Spaz = {};

/***********
Spaz.Debug
************/
if (!Spaz.Debug) Spaz.Debug = {};

Spaz.Debug.enable = function() {
	Spaz.Prefs.set('debug-enabled', true);
};

Spaz.Debug.disable = function() {
	Spaz.Prefs.set('debug-enabled', false);
};

Spaz.Debug.setEnable = function(state) {
	if (state) {
		Spaz.Debug.enable();
	} else {
		Spaz.Debug.disable();
	}
};

Spaz.Debug.dump = function(msg, type) {
	// if ( Spaz.Prefs && Spaz.Prefs.get('debug-enabled') ) {
		
		if (!type) {
			type = 'info';
		}

		console.info(msg);
	
		Spaz.Debug.logToFile(msg);
	// }
}

/**
 * @TODO 
 */
Spaz.Debug.logToFile = function(msg) {
	// var docs_dir     = Titanium.Filesystem.getDocumentsDirectory();
	// debug_file       = docs_dir.resolve("spaz-ti-debug.log");
	// now = new Date();
	// debug_file.write(now.toString() + ' : ' + msg + "\n");
}


// Spaz.Debug.dump = function(msg, type) {
// 
// }


// alias
Spaz.dump = Spaz.Debug.dump;


Spaz.Debug.showProps = function(obj, objName) {
	console.info('dumping '+objName);
	var result = "";
	for (var i in obj) {
	   result += objName + "." + i + " = " + obj[i] + "\n";
	}
	console.info(result);
}



Spaz.Debug.dumpHTML = function() {
	var docsDir = Titanium.Filesystem.getDocumentsDirectory();
	try {
		docsDir.browseForSave("Save HTML As");
		docsDir.addEventListener(air.Event.SELECT, Spaz.Debug.dumpHTMLSelectListener);
	} catch (error) {
		Spaz.dump("Failed:"+error.message, 'error');
	}
};

Spaz.Debug.dumpHTMLSelectListener = function(event) {
	var newFile = event.target;
	Spaz.dump('got newFile '+newFile.url);
	
	var html = $('html')[0].outerHTML;
	html = html.replace(/app:\/\//, '');
	html = html.replace(/onclick="Spaz\.UI\.setSelectedTab\(this\)"/, '');
	
	Spaz.dump('got html '.html);

	var stream = new air.FileStream();
	Spaz.dump('made stream ');
	stream.open(newFile, air.FileMode.UPDATE);
	Spaz.dump('opened stream '+newFile.url);
	stream.writeUTFBytes(html);
	Spaz.dump('write utfbytes '+html);
	stream.close();
	Spaz.dump('close stream')

}


Spaz.Debug.insertDebugScripts = function() {
	console.info("INSERT DEBUGGING SCRIPTS");
	var e = document.createElement("script");
	e.src = "assets/air/AIRIntrospector.js";
	e.type= "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(e);
	//<base href="app:/"/>
	//<script src="assets/jquery/jquery-profile.js" type="text/javascript" charset="utf-8"></script>
};