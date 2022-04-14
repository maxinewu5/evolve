//function to get user id
function getId() {
var curid;
$.ajax({
    type: 'GET',
    url: 'https://api.spotify.com/v1/me',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
    'Authorization': 'Bearer ' + access_token
    },
    async: false,
    success: function(response) {
    console.log("user id 1:" + response.id);
    curid = response.id;
    }
});
return curid;
}

//get features from a track (one)
function getFeaturesTrack(track) {
    $.ajax({
      type: 'GET',
      url: 'https://api.spotify.com/v1/audio-features/' + track,
      contentType: 'application/json',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      async: false,
      success: function(result){
        console.log(result);
      }
    })
  }

//get features from tracks (mulutiple)
function getFeaturesTracks(tracks) {
    var featureData;
    var tracks_string = "ids=";
    tracks_string += tracks[0];
    for (var i = 1; i < tracks.length; i++) {
      tracks_string += ",";
      tracks_string += tracks[i];
    }
    console.log(tracks_string);
    $.ajax({
      type: 'GET',
      url: "https://api.spotify.com/v1/audio-features/?" + tracks,
      contentType: 'application/json',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      data: tracks_string,
      async: false,
      success: function(result){
        console.log(result);
        featureData = result.audio_features;
      }
    })
    return featureData;
}

function getUserTopSongs(limit, offset, time_range) {
    var songs = [];
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/me/top/tracks',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
        'Authorization': 'Bearer ' + access_token
        },
        data: {
        'limit': limit,
        'offset': offset,
        'time_range': time_range
        },
        async: false,
        success: function(result){
        console.log(result);
        for (var i = 0; i < limit; i++) {
            songs.push(result.items[i].id);
        }
        //getFeaturesTrack(songs[0]);
        }
    })
    return songs;
}