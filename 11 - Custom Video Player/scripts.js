//Declare Variables

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const fullscreen = player.querySelector('.fullscreen');

//Declare Functions

function togglePlay(e) {
    video.paused === true ? video.play() : video.pause();
}

function changeIcon(e) {
    const icon = video.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skip(e) {
    let skipAmount = this.dataset.skip;
    video.currentTime += parseFloat(skipAmount);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

function scrub(e) {
    scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function makeFullscreen(e) {
    console.log('test');
    video.webkitRequestFullScreen();
  }
  
//Add Event Listeners

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', changeIcon);
video.addEventListener('pause', changeIcon);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', makeFullscreen);
