String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

function extract() {
	var data = {
		type: 'error'
	};

	if ( $('body').hasClass('artist') ) {

		data.allmusic_src = window.location.href;
		data.name = $('.page-heading .artist-name').text().trim();

		data.members = [];
		$('.group-members a').each( function( index, elem ) {
			data.members.push( {
				type: 'artist',
				allmusic_src: $(elem).attr('href'),
				name: $(elem).text()
			} );
		} );

		data.member_of = [];
		$('.member-of a').each( function( index, elem ) {
			data.member_of.push( {
				type: 'band',
				allmusic_src: $(elem).attr('href'),
				name: $(elem).text().trim()
			} );
		} );

		if ( data.members.length > 0 ) {
			data.type = 'band';
		}
		else {
			data.type = 'artist';
		}

		data.albums = [];
		$('#discography .album-table .title .full-title').each( function( index, elem ) {
			data.albums.push( {
				type: 'album',
				allmusic_src: $(elem).attr('href'),
				title: $(elem).text()
			} );
		} );
	}

	if ( $('body').hasClass('album') ) {
		data.allmusic_src = window.location.href;
		data.type = 'album';
		data.title = $('.page-heading .album-title').text().trim();
		data.release_date = $('.details .release-date').text().trim();
		data.duration = $('.details .duration').text().trim();

		data.songs = [];
		$('#tracks tbody tr').each(function( index, elem ) {

		var titleLink = $(elem).find('div.title a.primary_link');
		var artists = [];

			$(elem).find('div.artist a').each( function( index, elem ) {
				artists.push( {
					type: 'artist',
					name: $(elem).text().trim(),
					allmusic_src: $(elem).attr('href')
				} );
			} );

			data.songs.push( {
				type: 'song',
				allmusic_src: titleLink.attr('href'),
				title: titleLink.text().trim(),
				duration: $(elem).find('.time').text().trim(),
				number: $(elem).find('.tracknum').text().trim(),
				artists: artists
			} );
		} );
	};

	return data;
}

chrome.extension.sendRequest(extract());