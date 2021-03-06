if (!Spaz.Themes) Spaz.Themes = {};

// placeholder for themes object
Spaz.Themes.themes = {};

// initializer
Spaz.Themes.init = function() {
	Spaz.Themes.themes = Spaz.Themes.getThemePaths();
	for(x in Spaz.Themes.themes) {
		$('head').append('<link href="'+Spaz.Themes.themes[x].themecss+'" title="'+Spaz.Themes.themes[x].themename+'" rel="stylesheet" type="text/css" />');
	}
	
	// build the dropdown menu
	$('#theme-basetheme').empty();


	/**
	* Styleswitch stylesheet switcher built on jQuery
	* Under an Attribution, Share Alike License
	* By Kelvin Luck ( http://www.kelvinluck.com/ )
	**/
	$('link[rel*=style][title]').each(function(i){
		var title = this.getAttribute('title');
		$('#theme-basetheme').append('<option value="'+title+'">'+title+'</option>');
		Spaz.dump("css:"+this.title);
	});

	$('#theme-basetheme').val(Spaz.Prefs.get('theme-basetheme'));
	Spaz.Themes.setCurrentTheme();
	
	// make the element to contain user CSS
	$('head').append('<style type="text/css" media="screen" id="UserCSSOverride"></style>');
	
	// load the user.css file
	Spaz.Themes.loadUserCSS();
};



Spaz.Themes.browseForUserCss = function() {
	// var cssFilter = new air.FileFilter("StyleSheets", "*.css;");
	// var userFile = new air.File();
	// userFile.browseForOpen("Choose a CSS file", [cssFilter]);
	// userFile.addEventListener(air.Event.SELECT, Spaz.Themes.userCSSSelected);
}


Spaz.Themes.userCSSSelected = function(event) {
	Spaz.dump(event.target.url);
	var stylestr = Spaz.Themes.loadUserStylesFromURL(event.target.url)
	Spaz.dump(stylestr);
	Spaz.Themes.setUserStyleSheet(stylestr, event.target.url);
}



Spaz.Themes.setUserStyleSheet = function(stylestr, url) {
	Spaz.Prefs.set('theme-userstylesheet', url);
	$('#UserCSSOverride').text(stylestr);
	// $('#user-stylesheet').val(Spaz.Prefs.get('theme-userstylesheet'));
	
	// save the userstylesheet to the user's css file
	var csspath = Spaz.Themes.getUserCSSFile().url;
	Spaz.Sys.setFileContents(csspath, stylestr);
}


Spaz.Themes.loadUserCSS = function() {
	
	var usercssfile = Spaz.Themes.getUserCSSFile();
	
	if (usercssfile.exists) {
		$('#UserCSSOverride').text(Spaz.Themes.loadUserStylesFromURL(usercssfile.url));
	}
	
};


Spaz.Themes.getUserCSSFile = function() {
	return Titanium.Filesystem.getApplicationDataDirectory().resolve('user.css')
};


Spaz.Themes.loadUserStylesFromURL = function(fileurl) {
	return Spaz.Sys.getFileContents(fileurl);
}



Spaz.Themes.clearUserStyleSheet = function() {
	Spaz.Prefs.set('theme-userstylesheet', '');
	$('#UserCSSOverride').text('');
	// $('#user-stylesheet').val(Spaz.Prefs.get('theme-userstylesheet'));
}




/**
* Styleswitch stylesheet switcher built on jQuery
* Under an Attribution, Share Alike License
* By Kelvin Luck ( http://www.kelvinluck.com/ )
**/
Spaz.Themes.setCurrentTheme = function() {	
	Spaz.dump('current theme:' + Spaz.Prefs.get('theme-basetheme'));
	$('link[rel*=style][title]').each(function(i) {
		this.disabled = true;
		Spaz.dump(this.getAttribute('title') + " is now disabled");
		if (this.getAttribute('title') == Spaz.Prefs.get('theme-basetheme')) {
			this.disabled = false;
			Spaz.dump(this.getAttribute('title') + " is now enabled");
		}
	});

	// change the paths for embedded imgs
	$('img.tab-icon, #loading img, .status-actions img').each(function(i) {
		// console.info('SETTING EMBEDDED IMG PATHS');
		// 		var themePath = Spaz.Themes.getPathByName( Spaz.Prefs.get('theme-basetheme') );
		
		this.src = this.src.replace(/\{theme-dir\}/, Spaz.Prefs.get('theme-basetheme'));
	});

}


Spaz.Themes.getThemePaths = function() {
	var appdir    = Titanium.Filesystem.getFile(Titanium.App.path);
	var themesdir = appdir.resolve('themes');
	var appStore  = Titanium.Filesystem.getApplicationDataDirectory();
	var userthemesdir = appStore.resolve('userthemes');
	
	// we load from both the built-in themes dir and the userthemes dir
	var themesdir_list = themesdir.getDirectoryListing() || [];
	var userthemesdir_list = userthemesdir.getDirectoryListing() || [];
	
	var list = themesdir_list.concat(userthemesdir_list);
	
	var themes = new Array();
	for (i = 0; i < list.length; i++) {
		if (list[i] && list[i].isDirectory()) {
			
			var thisthemedir = list[i];
			var thisthemename= thisthemedir.name;
			var thisthemecss = thisthemedir.resolve('theme.css');
			var thisthemejs  = thisthemedir.resolve('theme.js');
			var thisthemeinfo= thisthemedir.resolve('info.js');
			
			
			var thistheme = {
				themename: thisthemename,
				themedir : thisthemedir.url,
				themecss : thisthemecss.url,
				themejs  : thisthemejs.url,
				themeinfo: thisthemeinfo.url
			}
			
			// sanity check to make sure the themedir actually has something in it
			if (thisthemecss.exists) {
				themes.push(thistheme);
			}
		}
	}

	return themes;
}



Spaz.Themes.getPathByName = function(themename) {
	// console.info('Looking for:'+themename);
	
	
	for (i = 0; i < Spaz.Themes.themes.length; i++) {
		// console.info(JSON.stringify(Spaz.Themes.themes[i]))
		if (Spaz.Themes.themes[i].themename == themename) {
			// console.info('same');
			return Spaz.Themes.themes[i].themedir;
		}
	}
	return false;
}


