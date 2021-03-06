
window.addEventListener('load', function (e) {
	setTimeout(function() {
	
	var spotifyInput = localStorage.getItem("spotify-input");
	var duration = localStorage.getItem("duration");
	var playlistName = localStorage.getItem("playlist-name");

	var opt = localStorage.getItem("adv");

	var energy;
	var danceability;
	var acousticness;
	var popularity;
	if (opt == "true") {
		energy = localStorage.getItem("energy");
		danceability = localStorage.getItem("danceability");
		acousticness = localStorage.getItem("acousticness");
		popularity = localStorage.getItem("popularity");
	}

  	e.preventDefault();

	var query = spotifyInput;
	
	var token = window.location.search.split("?")[1].split("=")[1];
	
  	var user_id = '';

	var playlist_id = '';
    
	fetch('/api/userinfo?access_token=' + token)
  	.then(function (response) {
    	return response.json();
  	}).then(function (userinfo) {	  	
  		user_id = userinfo.id;
      		return fetch('/api/create-playlist?access_token=' + token + "&id=" + user_id + "&name=" + playlistName)
      		.then(function(response) {     		
      			return response.json();
		}).then(function(createdplaylist) {
			playlist_id = JSON.parse(createdplaylist).id;
			return fetch('/api/spotify?q=' + query + '&access_token=' + token)
			.then(function(response) {	
				return response.json();    
				}).then(function(search) {
					var artistID = search.tracks.items[0].artists[0].id;
					var apiURL;
					return fetch('/api/recommendations?artistid=' + artistID + '&access_token=' + token)
					.then(function (response) {
						return response.json();
					}).then(function (recs) {
						var datum = JSON.parse(recs);
						var dict = datum.tracks;
						var totaltime = 0;
						var songs = [];
						for (var i = 0; i < dict.length; i++) {
							if (totaltime < duration) {   
								totaltime += dict[i].duration_ms / 1000
								songs.push(dict[i].uri);
							}
						}
						return fetch('./api/addsongs?uris=' + songs + '&id=' + user_id + "&playlistid=" + playlist_id + '&access_token=' + token)
						.then(function(response) {
							return response.json();
						}).then(function(addedsongs) {
							return fetch('./api/getplaylist?id=' + user_id + "&playlistid=" + playlist_id + "&access_token=" + token)
							.then(function(response) {
								return response.json();
							}).then(function(retrievedplaylist) {
								localStorage.setItem("uritouse", JSON.parse(retrievedplaylist).uri);
							});
						});
					});
				});
			});
		});
	}, 3000);
});
