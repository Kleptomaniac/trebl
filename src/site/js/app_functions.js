var prev;
var playlistname;


function appendHash(identifier) {
    $(identifier).each(function () {
        var tag = $(this).text()
        if (tag[0] != '#') {
            $(this).text("#" + tag);
        }
    });
}

function closePopup() {
    $("#playlistname").val("");
    $("#genressearch").val("");
    $("#popup").css("display", "none");
    $("#black_overlay").css("display", "none");
    $("#close_popup").css("display", "none");
}


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
    $("#del_nt").hide();
    limit = (limit == 1 || limit == 5) ? limit : 4;
    console.log("Update - Tags: " + tags + " | PName: " + plname + " | Limit: " + limit);
    playlistname = plname;
    $.ajax({
        url: 'https://treblradio.appspot.com/api',
        data: {function: 'fetch_music', tags: tags, limit: limit, playlist: plname},
        success: function (output) {
            var tracks = JSON.parse(output);
            console.log(output);
            for (var i = 0; i < tracks.length; i++) {
                var retid = tracks[i].id;
                var tags = tracks[i].tags;
                if (limit == 5 && i == 0) {
                    $("#music_src").prop('src', tracks[i].stream_url);
                    $("#music_src").get(0).load();
                    $("#album_cover").prop('src', tracks[i].artwork_url);
                    $("#background_blur").css('background-image', 'url(' + tracks[i].artwork_url + ')');
                    $("#artist").parent().attr('retid', retid);
                    $("#artist").parent().attr('stream_url', tracks[i].stream_url);
                    $("#artist").text(tracks[i].artist);
                    $("#song_title").text(tracks[i].title);
                    $("#song_tags").empty();
                    for (var j = 0; j < tags.length; j++) {
                        $("#song_tags").append("<a>" + tags[j] + "</a>")
                    }
                    continue;
                }
                console.log("gotten past curr");
                var topdiv = "<div class='track_list id='next_track'></div>";
                if ((i == 0 && limit == 4) || (limit == 5 && i == 1)) {
                    console.log("doing nexttrack");
                    topdiv = "<div class='track_list id='next_track' retid='" + retid + "></div>";
                    console.log(topdiv);
                } else {
                    console.log("doing normtracks");
                    topdiv = "<div class='track_list' retid='" + retid + "'></div>";console.log(topdiv);
                    console.log(topdiv);
                }

                console.log("i'm here");

                $("#upcoming_tracks").append(topdiv);

                console.log("appended");
                var new_elem = "<div class='track_list_album'></div>" +
                    "<div class='track_list_info'>" +
                    "<span class='nt_artist'>" + tracks[i].artist + "</span>" +
                    "<span class='nt_name'>" + tracks[i].title + "</span>" +
                    "<div class='nt_tags'></div>";

                $("#" + retid).append(new_elem);
                console.log("appended new track info");

                $(".track_list[retid='" + retid + "'] div[class='track_list_album']").css('background-image', 'url(' + tracks[i].artwork_url + ')');
                for (j = 0; j < tags.length; j++) {
                    var tagadd = "<a>" + tags[j].toLowerCase() + "</a>";
                    $("#" + retid + "div[class='nt_tags']").append(tagadd);
                }
                $("#" + retid).attr("stream_url", tracks[i].stream_url);
                appendHash("#song_tags a");
                appendHash(".nt_tags a");
                $("#song_tags").append("<a>...</a>");
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
        if (count == $(".genre_search span").length) {
            updateTrackList(tags.toString(), playlistname, 1);
        }
    }, 2000)
}

function nextTrack() {
    prev = $(".curr_song_wrapper").clone();
    var cover = $("#next_track div[class='track_list_album']").attr('background-image');
    $("#music_src").get(0).pause();
    $("#album_cover").prop('src', cover);
    $("#background_blur").attr('background-image', cover);
    $("#artist").text($("#next_track div span[class='nt_artist']").text());
    $("#song_title").text($("#next_track div span[class='nt_name']").text());
    $("#song_tags").empty();
    $("#next_track div div[class='nt_tags'] a").each(function () {
        var tag = $(this).text();
        console.log(tag);
        var newatag = "<a>" + tag + "</a>";
        $("#song_tags").append(newatag);
    });
    var src = $("#next_track").attr("stream_url");
    $("#music_src").prop('src', src);
    $("#music_src").get(0).load();
    $("#play").click();
    $("#del_nt").click();
    tagsUpdated();
}

function prevTrack() {
    console.log("clicked");
    if (prev != null) {
        var holder = $(".curr_song_wrapper").clone();
        $(".curr_song_wrapper").remove();
        $(".curr_info").prepend(prev);
        prev = holder;
    }
}
