/*OBTENER NUESTROS ELEMENTOS*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*CONSTRUIR LAS FUNCIONES*/
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    /*if(video.paused){
    video.play();
    }
    else{
        video.pause();
        button.textContent = '>>';
    }*/    
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon; 
    //console.log('Update the button');   
    console.log(icon);
    //console.log('Its ran');
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
    //console.log('skipping!');
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    //console.log(this.value);
    //console.log(this.name);
}

function handleProgress(){
    const porcentaje = (video.correntTime / video.duration) * 100;
    progressBar.style.flexBasis = `${porcentaje}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(e);
}

/*CONECTAR LOS EVENTOS LISTNERS*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
//progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
/*progress.addEventListener('mousemove', () => () =>{
    if(mousedown){
        scrub();
    }
});*/
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
