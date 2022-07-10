(async function () {
    let audio = null;
    let totalLength = 0;
    let radioIndex = 0;
    let songsResponse
    let songs

    function updateMetadata() {
        if (audio && !audio.paused) {
            document.querySelector('#radio-info').innerHTML = songs[radioIndex].Title + '<br>' + toMinutes(Math.round(audio.currentTime)) + '/' + toMinutes(Math.round(audio.duration));
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

    function getCurrentPosition() {
        let beginning = Date.parse(new Date("2022-02-01T00:00:00.000+00:00").toLocaleString('en-US', {timeZone: 'UTC'})) / 1000;
        let now = Date.parse(new Date().toLocaleString('en-US', {timeZone: 'UTC'})) / 1000;

        let difference = now - beginning;
        let seekToPosition = difference % totalLength;
        console.log(totalLength)

        let currentPosition = 0;
        let timestamp = 0;
        let song = null;
        for (let songIndex in songs) {
            let currentSong = songs[songIndex];
            if (currentPosition + currentSong.Duration <= seekToPosition) {
                currentPosition += currentSong.Duration;
            } else {
                song = currentSong;
                timestamp = seekToPosition - currentPosition;
                radioIndex = songIndex;
                break;
            }
        }
        return {song, timestamp}
    }

    function handleEnded() {
        radioIndex = parseInt(radioIndex) + 1;
        if (radioIndex >= songs.length)
            radioIndex = 0;

        audio.pause();
        audio.src = songs[radioIndex].Url;
        console.log('Source changed.');
        audio.load();
    }

    function handleLoadStart() {
        document.querySelector('#radio-info').innerHTML = "Loading...";
    }

    function handleCanPlay() {
        if (audio.paused) {
            console.log('Audio loaded.');
            let position = getCurrentPosition();
            if (audio.currentTime != position.timestamp) {
                audio.currentTime = position.timestamp;
            }
            audio.play();
        }
    }

    async function initRadio() {
        songsResponse = await fetch('https://benzin-radio.herokuapp.com/songs');
        songs = await songsResponse.json();
        totalLength = songs.reduce((currentLength, song) => song.Duration + currentLength, 0);
        audio.src = songs[radioIndex].Url;
        audio.load();

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