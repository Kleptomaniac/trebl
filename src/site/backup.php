<?php require('header.php') ?>

    <div class="container">
        <div class="music_info">
            <div class="curr_info">
                <div id="background_blur"></div>
                <div class="curr_song_wrapper">
                    <div class="album_cover">
                        <img id="album_cover" src="../site/images/album_placeholder.png" alt="album_cover">
                    </div>
                    <div class="track_info">
                        <h3 id="artist"></h3>
                        <span><p id="song_title"></p></span>
                        <div id="song_tags">
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
                    <a id="del_nt">x</a>
                    <div class="track_list next_track">
                        <div class="track_list_album"></div>
                        <div class="track_list_info">
                            <span class="nt_artist"></span>
                            <span class="nt_name"></span>
                            <div class="nt_tags"></div>
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
                    <ul>
                        <li class="player_buttons">
                            <button id="previous"></button>
                            <button id="play"></button>
                            <button id="pause"></button>
                            <button id="next"></button>
                            <button id="volume"></button>
                            <button id="mute"></button>
                        </li>
                        <li>
                            <div id="volume_bar">
                                <div id="volume_slider"></div>
                            </div>
                        </li>
                        <li><span id="player_time">--:--</span></li>
                        <li>
                            <div id="timeline">
                                <div id="timeline_slider"></div>
                                <video id="music_src"
                                       src="">
                                </video>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="fc_wrappers">
                <div class="genre_search">
                    <input type="text" placeholder="Search your favourite #genres" id="new_search_tag"/>
                </div>
            </div>
        </div>
    </div>

<?php require('footer.php') ?>