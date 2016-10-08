<?php require('header.php') ?>

    <div class="container">
        <div class="music_info">
            <div class="curr_info">
                <div class="album_cover">
                    <img id="album_cover" src="images/AVSAlbum.jpg" alt="album_cover">
                </div>
                <div class="track_info">
                    <h3 id="artist">Art vs Science</h3>
                    <p id="album_title">Off the Edge of the Earth and Into Forever, Forever</p>
                    <div id="song_tags">
                        <a>techno</a>
                        <a>grunge</a>
                        <a>deep house</a>
                    </div>
                    <div class="blank_box"></div>
                </div>
                <div class="player">
                    <ul>
                        <li class="player_buttons">
                            <a><img src="images/prev.svg" id="previous"/></a>
                            <a><img src="images/play.svg" id="play_pause"/></a>
                            <a><img src="images/next.svg" id="next"/></a>
                        </li>
                        <li>Repeat</li>
                        <li class="player_timeline">
                            <span>0:00</span>
                            <div class="waveform">
                            </div>
                            <span>4:12</span>
                        </li>
                        <li>Volume</li>
                    </ul>
                </div>
            </div>
            <div class="next_info">
                <h3>Up Next</h3>
                <div class="next_album">
                    <img id="next_album" src="images/EdSheeranAlbum.jpeg" alt="next_album_cover">
                </div>
                <div class="next_song_info">
                    <p>Drunk<br><span class="next_album_name">X</span></p>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="genre_search">
                    <span>techno</span>
                    <span>grunge</span>
                    <span>deep house</span>
                <input type="text" placeholder="" id="new_search_tag"/>
            </div>
        </div>
    </div>
    <script>
        $(".nav ul li a").on('click', function () {
            $(this).toggleClass("active");
        });

        $("#song_tags a").each(function () {
            var tag = $(this).text()
            $(this).text("#" + tag);
        });

        $(document).on('keyup', '#new_search_tag', function (ev) {
            console.log("working");
            if (ev.which == 13) {
                console.log("working2");
                var val = $(this).val();
                var element = "<span>#" + val + "</span>";
                var holder = $(this).detach();
                $(".genre_search").append(element);
                $(".genre_search").append(holder);

            }
        });

        $(document).bind('soundcloud:onPlayerReady', function (event, data) {
            // the soundcloud.player.api.js wrapper triggers custom events
            // please refer to JS API wrapper for full event list
            var apiUrl = data.mediaUri + '.json?callback=?';
            // call the SoundCloud API for more info
            $.getJSON(apiUrl, function (data) {
                // please refer to SoundCloud api for the resource types
                // http://wiki.github.com/soundcloud/api/03-resource-types
                // display the title
                $('<h1>' + data.title + '</h1>').appendTo(document.body);
                // display the artwork
                var img = new Image();
                img.src = data.artwork_url;
                $(img).appendTo(document.body);
            });
        });


    </script>

<?php require('footer.php') ?>