var Spaz; if (!Spaz) Spaz = {};

/*************
Spaz.Data
*************/
if (!Spaz.Shortlink) Spaz.Shortlink = {};

$.ajaxSetup(
	{
		timeout:1000*20, // 20 second timeout
		async:true
		// cache:false
	}
);


Spaz.Shortlink.$copyToClipboard = function(shorturl) {
	// alert(shorturl);
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT,shorturl,false);
	$('#verification-result').text("URL shortened and copied to clipboard");
	$('#shorten-short-link').val(shorturl);
	$('#shorten-short-link').focus();
	$('#shorten-short-link').select();
};


Spaz.Shortlink.services = {
    'shortie' : function (url, custom) {
		if (url.match(/ /gi)) {
			var origLink = url.replace(/ /gi, '%20');
		} else {
			var origLink = url;
		}
		
		console.info(url+"\n"+origLink);
        
        $('#verification-result').text('Shortening URL...');

        var shortie = {
            orig: '',
            url: '',
            email: '',
            private: '',
            format: 'rest'
        };

        shortie.orig = origLink;

        shortie.url = shortie.orig;
        shortie.email = Spaz.Prefs.get('services-shortie-email');
        shortie.secretKey =  Spaz.Prefs.get('services-shortie-secretkey');
        shortie.private =  'false';
        shortie.format =  'rest';

        if (custom != null) {
            shortie.custom = custom;
        }

        var xhr = $.ajax({
            complete: function (xhr, rstr) {
                var shorturl = trim(xhr.responseText);
                
				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
                } else {
                    $('#verification-result').text("Service returned an error: '" + shorturl + "'");
                }
            },
            error: function (xhr, rstr) {
                $('#verification-result').text('Error trying to shorten link');
            },
            success: function (data) { },

            beforeSend: function (xhr) {

            },

            processData: true,

            type:"GET",
            url: 'http://short.ie/api?',
            data: shortie
        });
    },
	
	
	'twurl.nl' : function(url) {
	
		// console.info('OrigLink:'+origlink);
		var origlink = encodeURIComponent(url);
	
		$('#verification-result').text('Shortening URL...');
	
		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}
	
				var shorturl = trim(xhr.responseText);
	
				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}
	
			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}
	
			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"POST",
			url:'http://tweetburner.com/links',
			data:"link[url]="+url,
		});		
	},

	bitly : function(url) {
		var origlink = encodeURIComponent(url);

		// console.info('OrigLink:'+origlink);

		$('#verification-result').text('Shortening URL...');

		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}

			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://bit.ly/api',
			data:"url="+origlink,
		});
	},
	
	
	
	urlzen : function(url) {
		var origlink = encodeURIComponent(url);

		// console.info('OrigLink:'+origlink);

		$('#verification-result').text('Shortening URL...');

		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}

			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://urlzen.com/api',
			data:"url="+origlink,
		});
	},
	
	
	
	xrlus : function(url) {
		var origlink = encodeURIComponent(url);

		// console.info('OrigLink:'+origlink);

		$('#verification-result').text('Shortening URL...');

		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}

			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://metamark.net/api/rest/simple',
			data:"long_url="+origlink,
		});
	},
	
	
	snipr : function(url) {
		var origlink = encodeURIComponent(url);

		// console.info('OrigLink:'+origlink);

		$('#verification-result').text('Shortening URL...');


		var xhr = $.ajax({
			complete:function(xhr, rstr){
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}
				// console.info('Response-headers:');
				// console.info(xhr.getAllResponseHeaders());
				// console.info('XHR Object:');
				// console.info(xhr);
				// console.info("COMPLETE: " + rstr);
				// console.info(xhr.responseText);

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}


			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://snipr.com/site/snip',
			data:"&r=simple&link="+origlink
		});
	},
	
	
	
	
	revcanonical : function(url) {
		var origlink = encodeURIComponent(url);

		$('#verification-result').text('Shortening URL...');

		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}

			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://revcanonical.appspot.com/api',
			data:"url="+origlink,
		});
	},


	isgd : function(url) {
		var origlink = encodeURIComponent(url);

		// console.info('OrigLink:'+origlink);

		$('#verification-result').text('Shortening URL...');

		var xhr = $.ajax({
			complete:function(xhr, rstr) {
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
					$('#verification-result').text('ERROR: Timeout');
					return;
				}

				var shorturl = trim(xhr.responseText);

				if (shorturl.search(/^http/i)!=-1) {
					Spaz.Shortlink.$copyToClipboard(shorturl)
				} else {
					$('#verification-result').text("Service returned an error: '"+shorturl+"'");
				}

			},
			error:function(xhr, rstr){
				// console.info("ERROR: " + rstr);
				$('#verification-result').text('Error trying to shorten link');
				if (xhr.readyState < 3) {
					// console.info("ERROR: Timeout");
				}

			},
			success:function(data){
				// console.info(data);
				// Spaz.UI.statusBar("Shortened URL");
				// $('#shorten-short-link').val(data);
			},
			beforeSend:function(xhr){},
			processData:false,
			type:"GET",
			url:'http://is.gd/api.php',
			data:"longurl="+origlink,
		});
	}
	
}








