<?php require('header.php') ?>

    <div class="container">
        <div class="music_info">
            <div class="curr_info">
                <div class="curr_song_wrapper">
                    <div class="album_cover">
                        <img id="album_cover" src="images/album_placeholder.png" alt="album_cover">
                    </div>
                    <div class="track_info">
                        <h3 id="artist">Art vs Science</h3>
                        <span><p id="album_title">Off the Edge of the Earth and Into Forever, Forever</p></span>
                        <div id="song_tags">
                            <a>techno</a>
                            <a>grunge</a>
                            <a>deep house</a>
                        </div>
                    </div>
                </div>
                <div class="waveform"></div>
            </div>
            <div class="next_info">
                <div class="up_next_header">
                    <span id="up_next">UP NEXT</span>
                </div>
                <div class="upcoming_tracks">
                    <div class="track_list next_track">
                        <div class="track_list_album">
                        </div>
                        <div class="track_list_info">
                            <span class="nt_name">Song Name</span>
                            <span class="nt_album">Album Name</span>
                            <div class="nt_tags">
                                <a>Tag 1</a>
                                <a>Tag 2</a>
                                <a>Tag 3</a>
                            </div>
                        </div>
                    </div>
                    <div class="track_list"></div>
                    <div class="track_list"></div>
                    <div class="track_list"></div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="fc_wrappers">
                <div class="media_controls">
                    <div id="border_wrapper">
                        <ul>
                            <li class="player_buttons">
                                <button class="previous"></button>
                                <button class="play"></button>
                                <button class="next"></button>
                                <button class="volume"></button>
                            </li>
                            <li>
                                <div id="volume_bar">
                                    <div id="volume_slider">
                                    </div>
                                </div>
                            </li>
                            <li><span id="player_time">1:53</span></li>
                            <li>
                                <div id="timeline">
                                    <div id="timeline_slider">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="fc_wrappers">
                <div class="genre_search">
                    <span>techno</span>
                    <span>grunge</span>
                    <span>deep house</span>
                    <input type="text" placeholder="Search your favourite #genres" id="new_search_tag"/>
                </div>
            </div>
        </div>
    </div>
    <script>
        function appendHash(identifier) {
            $(identifier).each(function () {
                var tag = $(this).text()
                if(tag[0] != '#') {
                    $(this).text("#" + tag);
                }
            });
        }
        $(document).ready(function () {
            appendHash("#song_tags a");
            appendHash(".genre_search span");
            appendHash(".nt_tags a");
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
                $(this).val("");
            }
        });

        $("#del_nt").on('click', function () {
            var holder = $(this).clone();
            holder.css("display", "none");
            $(this).parent().next().addClass("active_track");
            $(this).parent().next().append(holder);
            $(this).parent().remove();
        });

        $(function () {
            var vol_slider = $("#volume_slider");
            var time_slider = $("#timeline_slider");

            vol_slider.slider({
                range: "min",
                min: 0,
                value: 35,
            });

            time_slider.slider({
                range: "min",
                min: 0,
                value: 0,
            });
        });
    </script>

<?php require('footer.php') ?>