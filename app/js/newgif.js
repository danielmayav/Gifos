const video = document.querySelector('#video');
const starBtn = document.querySelector('#start');

async function getVideo () {
    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: {max:640},
            height: {max:480}
        }
    }) .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
}
