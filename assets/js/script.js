document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeElement = document.getElementById('currentTime');
    const durationElement = document.getElementById('duration');


    const tryAutoplay = () => {
        musica.play()
            .then(() => {
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                console.log("Autoplay funcionou!");
            })
            .catch(error => {
                console.log("Autoplay bloqueado. Aguardando interação...");

                playButton.style.display = 'block';
            });
    };


    musica.volume = 0.6;


    document.body.addEventListener('click', () => {
        if (musica.paused) {
            tryAutoplay();
        }
    }, { once: true }); 

    setTimeout(tryAutoplay, 1000);


    musica.addEventListener('timeupdate', updateProgress);
    playButton.addEventListener('click', togglePlay);
    progressBar.addEventListener('input', setProgress);
    musica.addEventListener('ended', () => {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    });

    function togglePlay() {
        if (musica.paused) {
            musica.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            musica.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function updateProgress() {
        progressBar.value = (musica.currentTime / musica.duration) * 100;
        currentTimeElement.textContent = formatTime(musica.currentTime);
        
        if (!isNaN(musica.duration)) {
            durationElement.textContent = formatTime(musica.duration);
        }
    }

    function setProgress() {
        musica.currentTime = (progressBar.value / 100) * musica.duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});