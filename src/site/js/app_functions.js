var track_list;
var prev;
var playlistname;


function onTrackedVideoFrame(currentTime) {
    var time = parseInt(currentTime);
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
    $("#player_time").text(finalTime);
}

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function tracklistInit() {
    $("#popup").css("display", "block");
    $("#black_overlay").css("display", "block");
    $("#close_popup").css("display", "block");
}

function updateTrackList(tags, plname, limit) {
    playlistname = plname;
    $.ajax({
        url: 'https://treblradio.appspot.com/api',
        data: {function: 'fetch_music', genres: tags, limit: limit, playlist_name: plname},
        success: function (output) {
            var tracks = JSON.parse(output);
            for (var i = 0; i < tracks.length; i++) {
                var retid = tracks[i].id;
                var genres = tracks[i].genres.split("/");
                if(limit == 5) {
                    $("#music_src").prop('src', tracks[i].stream_url);
                    $("#music_src").get(0).load();
                    $("#artist").parent().attr('retid', retid);
                    $("#artist").parent().attr('stream_url', tracks[i].stream_url);
                    $("#artist").text(tracks[i].artist);
                    $("#song_title").text(tracks[i].title);
                    $("#song_tags").empty();
                    for(var j = 0; j < genres.length; j++) {
                        $("#song_tags").append("<a>" + genres[i] + "</a>")
                    }
                    continue;
                }
                if((i == 0 && limit == 4) || (limit == 5 && i == 1)) {
                    var topdiv = "<div class='track_list next_track' id='" + retid + "></div>";
                } else {
                    var topdiv = "<div class='track_list' id='" + retid + "'></div>";
                }
                $(".upcoming_tracks").append(topdiv);

                var new_elem = "<div class='track_list_album'></div>" +
                    "<div class='track_list_info'>" +
                    "<span class='nt_artist'>" + tracks[i].artist + "</span>" +
                    "<span class='nt_name'>" + tracks[i].title + "</span>" +
                    "<div class='nt_tags'></div>";

                $("#" + retid).append(new_elem);

                $("#" + retid + "div[class='track_list_album']").css("background-image", "url: ('" + tracks[i].artwork_url + "')");
                for (j = 0; j < genres.length; j++) {
                    var tagadd = "<a>" + genres[i].toLowerCase() + "</a>";
                    $("#" + retid + "div[class='nt_tags']").append(tagadd);
                }
                $("#" + retid).attr("stream_url", tracks[i].stream_url);
            }
        }
    });
}

function tagsUpdated() {
    var tags = [];
    $(".genre_search span").each(function () {
        tags.push($(this).text().substring(1));
    });
    var count = $(".genre_search span").length;
    setTimeout(function () {
        if(count == $(".genre_search span").length) {
            updateTracklist(tags.toString(), playlistname, 1);
        }
    }, 2000)
}

function nextTrack() {
    prev = $(".curr_song_wrapper").clone();
    var cover = $(".next_track div[class='track_list_album']").attr('background-image');
    $("#music_src").get(0).pause();
    $("#album_cover").prop('src', cover);
    $("#background_blur").attr('background-image', cover);
    $("#artist").text($(".next_track div span[class='nt_artist']").text());
    $("#song_title").text($(".next_track div span[class='nt_name']").text());
    $("#song_tags").empty();
    $(".next_track div div[class='nt_tags'] a").each(function () {
        var tag = $(this).text();
        console.log(tag);
        var newatag = "<a>" + tag + "</a>";
        $("#song_tags").append(newatag);
    });
    var src = $(".next_track").attr("stream_url");
    $("#music_src").prop('src', src);
    $("#music_src").get(0).load();
    $("#play").click();
    $("#del_nt").click();
    tagsUpdated();
}

function prevTrack() {
    console.log("clicked");
    if(prev != null) {
        var holder = $(".curr_song_wrapper").clone();
        $(".curr_song_wrapper").remove();
        $(".curr_info").prepend(prev);
        prev = holder;
    }
}
