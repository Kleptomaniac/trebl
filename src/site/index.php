<?php require('header.php') ?>

    <div class="container">
        <div class="music_info">
            <div class="curr_info">
                <div class="curr_song_wrapper">
                <div class="album_cover">
                    <img id="album_cover" src="images/album_placeholder.png" alt="album_cover">
                </div>
                <div class="track_info">
                    <h3 id="artist">Artist Name</h3>
                    <p id="album_title">Album Title</p>
                    <div id="song_tags">
                        <a>Genre Tag 1</a>
                        <a>Genre Tag 2</a>
                        <a>Genre Tag 3</a>
                    </div>
                </div>
                </div>
                <div class="waveform"></div>
            </div>
            <div class="next_info">
                <h3>Up Next</h3>
                <div class="next_album">
                    <img id="next_album" src="images/album_placeholder.png" alt="next_album_cover">
                </div>
                <div class="next_song_info">
                    <p>Next Song Name<br><span class="next_album_name">Next Album</span></p>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="media_controls">
                <div class="player">
                    <ul>
                        <li class="player_buttons">
                            <a><img src="images/media_controls/trebl_prev.svg" id="previous"/></a>
                            <a><img src="images/media_controls/trebl_play.svg" id="play_pause"/></a>
                            <a><img src="images/media_controls/trebl_next.svg" id="next"/></a>
                        </li>
                        <li>Repeat</li>
                        <li>Volume</li>
                    </ul>
                </div>
            </div>
            <div class="genre_search">
                    <span>Current Search Tag 1</span>
                    <span>Current Search Tag 2</span>
                    <span>Current Search Tag 3</span>
                <input type="text" placeholder="Search your favourite #genres" id="new_search_tag"/>
            </div>
        </div>
    </div>
    <script>
        $(".nav ul li a").on('click', function () {
            $(this).toggleClass("active");
        });

        function appendHash(identifier) {
            $(identifier).each(function () {
                var tag = $(this).text()
                $(this).text("#" + tag);
            });
        }
        $(document).ready(function () {
            appendHash("#song_tags a");
            appendHash(".genre_search span");
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
    </script>

<?php require('footer.php') ?>