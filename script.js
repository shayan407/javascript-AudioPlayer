let container = document.getElementById('container');
let songTitle = document.getElementById('song-title');
let progress = document.getElementById('progress');
let progressBar = document.getElementById('progress-bar');
let prevBtn = document.getElementById('previous');
let playBtn = document.getElementById('play');
let nextBtn = document.getElementById('next');
let audio = document.getElementById('audio');
let albumArt = document.getElementById('album-art');

let tracks = ['Self Control','Sunflower'];
let trackIndex = 1;

loadTrack(tracks[trackIndex]);

function loadTrack(track){
    songTitle.innerText = track;
    audio.src = `music/${track}.mp3`;
    albumArt.src = `images/${track}.jpeg`;
}

function audioPlay(){
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}

function audioPause(){
    container.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

function prevTrack(){
    trackIndex--;
    if(trackIndex < 0){
        trackIndex = tracks.length - 1;
    }
    loadTrack(tracks[trackIndex]);
    audioPlay();
}

function nextTrack(){
    trackIndex++;
    if(trackIndex > tracks.length - 1){
        trackIndex = 0;
    }
    loadTrack(tracks[trackIndex]);
    audioPlay();
}

function updateProgress(e){
    let {currentTime,duration} = e.srcElement;
    let progressPercent = currentTime / duration * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e){
    let width = this.clientWidth;
    let clickLocation = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = clickLocation / width * duration;
}

playBtn.addEventListener('click', () => {
    isPlaying = container.classList.contains('play');
    if(isPlaying){
        audioPause();
    }else{
        audioPlay();
    }
});

prevBtn.addEventListener('click', prevTrack)
nextBtn.addEventListener('click', nextTrack)
audio.addEventListener('timeupdate', updateProgress)
progress.addEventListener('click', setProgress)
audio.addEventListener('ended', nextTrack)