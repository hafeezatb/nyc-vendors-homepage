const audio_btn = document.querySelector("a.sound-control");
const audio_player = document.querySelector("#audio-player")

audio_btn.addEventListener("click", e => {
    e.preventDefault();

    if(audio_player.paused){
        audio_player.play();
        audio_btn.classList.remove("fa-volume-up");
        audio_btn.classList.add("fa-volume-off");
    } else {
        audio_btn.classList.add("fa-volume-up")
        audio_btn.classList.remove("fa-volume-off");
        audio_player.pause();
    }
    
});

const audio_playlist = [
    {src: "audio/march-chants.wav", volume: 20},
    {src: "audio/march-walking-past-me.wav", volume: 20},
    {src: "audio/woman-storysharing-story.wav", volume: 100}
];

// set initial volume
audio_player.addEventListener("play", e => {
    let current_idx = 0;
    audio_playlist.forEach((sound, idx) => {
        if(audio_player.src.indexOf(sound.src) > -1){
            current_idx = idx;
        }
    });

    const this_item = audio_playlist[current_idx];

    audio_player.volume = this_item.volume / 100;
});

// playlist logic
audio_player.addEventListener("ended", e => {
    // console.log("FILE ENDED", audio_player.src);
    // what position is the current audio file in on the playlist?
    
    let current_idx = 0;
    audio_playlist.forEach((sound, idx) => {
        if(audio_player.src.indexOf(sound.src) > -1){
            current_idx = idx;
        }
    });
    
    // console.log("CURRENT IDX", current_idx);
    // console.log("PLAYLIST LENGTH", audio_playlist.length - 1);
    // choose the next item on the list
    let next_idx = current_idx + 1;

    // if we're at the end of the list, go back to the beginning
    if(next_idx > audio_playlist.length - 1){
        next_idx = 0;
    }

    // console.log(">> NEXT INDEX >>", next_idx, audio_playlist[next_idx]);

    const next_sound = audio_playlist[next_idx];

    // update the audio player to use the next src
    audio_player.src = next_sound.src;

    audio_player.play();
})