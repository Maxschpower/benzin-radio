(async function () {
    let audio = null;
    let currentSong
    let audioLoaded = false

    function updateMetadata() {
        if (!audioLoaded) return
        if (audio && !audio.paused) {
            document.querySelector('#radio-info').innerHTML = currentSong.song.title + '<br>' + toMinutes(Math.round(audio.currentTime)) + '/' + toMinutes(Math.round(audio.duration));
        } else if (audio) {
            try {
                audio.play();
            } catch (e) {
                console.log(e);
            }
        }
    }

    function toMinutes(time) {
        function stringPadLeft(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }

        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        return stringPadLeft(minutes, '0', 2) + ':' + stringPadLeft(seconds, '0', 2);
    }

    async function handleEnded() {
        currentSong = await requestNewSong();
        audio.pause();
        audio.src = currentSong.song.url;
        console.log('Source changed.');
        audio.load();
    }

    function handleLoadStart() {
        document.querySelector('#radio-info').innerHTML = "Loading...";
    }

    function handleCanPlay() {
        if (audio.paused) {
            console.log('Audio loaded.');
            let position = currentSong.timestamp;
            if (audio.currentTime != position) {
                audio.currentTime = position;
            }
            audio.play();
        }
    }

    async function requestNewSong() {
        let song = await fetch('https://benzin-radio.herokuapp.com/radio');
        // let song = await fetch('http://127.0.0.1:3000/radio');
        return song.json()
    }

    async function initRadio() {
        currentSong = await requestNewSong();

        audio.src = currentSong.song.url;
        audio.load();

        audioLoaded = true

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('canplay', handleCanPlay);
    }

    $('#asd').on('click', () => {
        initRadio();
    })

    $('#dialog-radio-close').on('click', () => {
        audio.pause();
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('canplay', handleCanPlay);
    });

    $('#radio-volume').on("input", function () {
        audio.volume = this.value / 100;
    });

    setInterval(() => {
        updateMetadata();
    }, 1000);

    // setup
    audio = document.querySelector('#radio-audio');
    audio.volume = 0.75;
})();