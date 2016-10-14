$(document).ready(function () {
    appendHash("#song_tags a");
    appendHash(".genre_search span");
    appendHash(".nt_tags a");
    //tracklistInit();
});

function appendHash(identifier) {
    $(identifier).each(function () {
        var tag = $(this).text()
        if (tag[0] != '#') {
            $(this).text("#" + tag);
        }
    });
}

$(document).on('keyup', '#new_search_tag', function (ev) {
    if (ev.which == 13) {
        var val = $(this).val();
        var element = "<span>#" + val + "</span>";
        var holder = $(this).detach();
        $(".genre_search").append(element);
        $(".genre_search").append(holder);
        $(this).val("");
        tagsUpdated();
    }
});

$(document).on('click', '#del_nt', function () {
    $(this).hide();
    $(".next_track").attr('del', 'true');
    $(".next_track").next().addClass("next_track");
    $(".next_track[del='true']").remove();
    if ($(".next_track").length > 0) {
        $(this).show();
    }
});

$(function () {
    var vol_slider = $('#volume_slider');

    vol_slider.slider({
        range: "min",
        min: 0,
        value: 40,
        max: 10000,

        slide: function (event, ui) {
            var value = vol_slider.slider('value'),
                volume = $('#music_src').prop('volume', value / 10000);
        }
    });
});

$(function () {
    var timeslide = $("#timeline_slider");
    var player = $("#music_src");

    player.on({
        canplaythrough: function () {
            var video = this;
            timeslide.slider({
                range: "min",
                min: 0,
                max: parseInt(video.duration, 10),
                value: 0,
                slide: function (event, ui) {
                    video.currentTime = ui.value;
                }
            });
        },
        timeupdate: function () {
            timeslide.slider('value', this.currentTime)
        }
    });
});

$(document).ready(function () {
    $("#music_src").on('timeupdate', function () {
        onTrackedVideoFrame(this.currentTime);
    });
});

$(document).on('click', '#popup_button', function () {
    console.log("triggered");
    if ($("#playlistname").val() == "") {
        $("#playlistname").attr('placeholder', "Enter Name");
        setTimeout(function () {
            $("#playlistname").attr('placeholder', "Best Beats");
        }, 2500);
    } else if ($("#genressearch").val() == "") {
        $("#genressearch").attr('placeholder', "Enter Genres");
        setTimeout(function () {
            $("#genressearch").attr('placeholder', "techno,pop,rnb");
        }, 2500);
    } else {
        var plname = $("#playlistname").val();
        var tags = $("#genressearch").val();
        tags = tags.replace(/\s+/g, "");
        updateTrackList(tags, plname, true);
    }
});

$(document).on('click', '#close_popup', function () {
    $("#playlistname").val("");
    $("#genressearch").val("");
    $("#popup").css("display", "none");
    $("#black_overlay").css("display", "none");
    $("#close_popup").css("display", "none");
});

$(document).on('click', '#generate', function () {
    tracklistInit();
});

$(document).on('click', '#next', function () {
    nextTrack();
});

$(document).on('click', '#previous', function () {
    prevTrack();
});

$(document).on('click', '#play', function () {
    $(this).css("display", "none");
    $("#pause").css("display", "inline-block");
    $("#music_src").get(0).play();
});

$(document).on('click', '#pause', function () {
    $(this).css("display", "none");
    $("#play").css("display", "inline-block");
    $("#music_src").get(0).pause();
});

$(document).on('click', '#volume', function () {
    $(this).css("display", "none");
    $("#mute").css("display", "inline-block");
    $("#music_src").prop('muted', true);
});

$(document).on('click', '#mute', function () {
    $(this).css("display", "none");
    $("#volume").css("display", "inline-block");
    $("#music_src").prop('muted', false);
});

$(document).ready(function () {
    var waveform = new Waveform({
        container: document.getElementById("test"),
        data: [1, 0.2, 0.5]
    });
});