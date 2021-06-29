//apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const NEWGIF_SECTION = document.getElementById('new-gif-sec')
const VIDEO = document.querySelector('#video');
const BTN_START = document.getElementById('btn-newgif-start');
const BTN_NEWGIF_REC = document.getElementById('btn-newgif-rec');
const BTN_NEWGIF_STOP = document.getElementById('btn-newgif-stop');
const BTN_NEWGIF_UPLOAD = document.getElementById('btn-newgif-upload');
const GRABAR_TITLE = document.getElementById('grabar-title');
const GRABAR_TEXT = document.getElementById('grabar-text');

const OVERLAY_VID = document.getElementById('overlay-vid');
const OVERLAY_PARAGRPH = document.getElementById('overlay-vid-p');
let OVERLAY_ACTIONS = document.getElementById('actions-overlay-vid');
const ACTIONS_OVL_LOAD = document.getElementById('actions-overlay-vid');
const GIF_PROG_NUM = document.querySelectorAll('.new-gif-progres');
const REC_CONTAINER = document.getElementById('time-counter');
const LOADING_ICON = document.getElementById('overlay-vid-ic');
const REPEAT_REC = document.getElementById('repeat-rec');
const RECORDED_GIF = document.getElementById('recorded-gif');
let recorder;
let blob;
let dateStarted;
let form = new FormData();
let misGifosArray = [];
let misGifosString = localStorage.getItem("misGifos");


BTN_START.addEventListener('click', newGifStart);

function newGifStart() {

    BTN_START.style.display = "none";

    GRABAR_TITLE.innerHTML = "¿Nos das acceso </br>a tu cámara?";
    GRABAR_TEXT.innerHTML = "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO."

    GIF_PROG_NUM[0].classList.add('prog-act');

    // ACCESO A LA CAMARA
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })

        
        .then(function (mediaStream) {
            //borro el texto
            GRABAR_TITLE.style.display = "none";
            GRABAR_TEXT.style.display = "none";
            BTN_NEWGIF_REC.style.display = "block";

            GIF_PROG_NUM[0].classList.remove('prog-act');
            GIF_PROG_NUM[1].classList.add('prog-act');

            //aparece el video
            VIDEO.style.display = "block";
            VIDEO.srcObject = mediaStream;
            VIDEO.onloadedmetadata = function (e) {
                VIDEO.play();
            };
            
            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })
}

BTN_NEWGIF_REC.addEventListener('click', gifRecord);

function gifRecord() {

    recorder.startRecording();
    console.log("Grabado GIF");

    BTN_NEWGIF_REC.style.display = "none";
    BTN_NEWGIF_STOP.style.display = "block";

    REC_CONTAINER.style.display = "block";
    REPEAT_REC.style.display = "none";

    //······ CONTADOR
    dateStarted = new Date().getTime();

    (function looper() {
        if (!recorder) {
            return;
        }
        REC_CONTAINER.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
}

// ···· FINALIZAR BTN -> SUBIR GIFO, CONTADOR DESAPARECE -> APARECE REPETIR CAPTURA

BTN_NEWGIF_STOP.addEventListener('click', finalizarGifo);

function finalizarGifo() {

    console.log("gif terminado");

    BTN_NEWGIF_STOP.style.display = "none";
    BTN_NEWGIF_UPLOAD.style.display = "block";

    REC_CONTAINER.style.display = "none";
    REPEAT_REC.style.display = "block";

    recorder.stopRecording(function () {
        VIDEO.style.display = "none";
        RECORDED_GIF.style.display = "block";

        blob = recorder.getBlob();
        RECORDED_GIF.src = URL.createObjectURL(recorder.getBlob());

        form.append('file', recorder.getBlob(), 'myGif.gif');
        form.append('api_key', apiKey);
    });
}

//  ···· SUBIR GIFO - PASO 3 -> ACT
BTN_NEWGIF_UPLOAD.addEventListener('click', subirGifo);

function subirGifo() {

    //muestro pantalla cargando y paso activo
    OVERLAY_VID.style.display = "flex";
    BTN_NEWGIF_UPLOAD.style.display = "none";
    GIF_PROG_NUM[1].classList.remove('prog-act');
    GIF_PROG_NUM[2].classList.add('prog-act');
    REPEAT_REC.style.display = "none";

    fetch(`https://upload.giphy.com/v1/gifs`, {
        method: 'POST',
        body: form,
    })
        .then(response => {
            return response.json();
        })
        
        .then(objeto => {
            console.log(objeto);
            let miGifId = objeto.data.id;
            
            console.log(objeto.data)

            ACTIONS_OVL_LOAD.style.display = "block";
            LOADING_ICON.setAttribute("src", "../assets/check.svg");
            OVERLAY_PARAGRPH.innerText = "GIFO subido con éxito";
            OVERLAY_ACTIONS.innerHTML = `
                <button id="btn-newgif-dwld" onclick="descargarGifCreado('${miGifId}')">
                <img src="../assets/icon-download.svg" alt="download">
                </button>
                <button id="btn-newgif-link">
                <img src="../assets/icon-link-normal.svg" onclick="copyLink('${miGifId}')" alt="link">
                </button>
                `;

            //si en el local storage no hay nada, el array queda vacio
            if (misGifosString == null) {
                misGifosArray = [];

            } else {
                //si tengo contenido, necesito parsearlo para agregar uno nuevo
                misGifosArray = JSON.parse(misGifosString);
            }

            misGifosArray.push(miGifId);
            //vuelvo a pasar a texto el array para subirlo al LS
            misGifosString = JSON.stringify(misGifosArray);
            localStorage.setItem("misGifos", misGifosString);
        })

        .catch(error => console.log("error al subir gif a GIPHY" + error))
}

async function copyLink(id) {
    let copyText = `https://media.giphy.com/media/${id}/giphy.gif`
    navigator.clipboard.writeText(copyText).then(() => {
        alert("¡Link copiado!")
    })

}

//FUNCION DESCARGAR GIF
async function descargarGifCreado(gifUrl) {
    let myGifUrl = `https://media.giphy.com/media/${gifUrl}/giphy.gif`
    let blob = await fetch(myGifUrl).then( img => img.blob());;
    invokeSaveAsDialog(blob, "migifo.gif");
}

//- repetir captura: funcion grabar
REPEAT_REC.addEventListener('click', repetirGifo);

function repetirGifo() {
    recorder.clearRecordedData();
    console.log("re-grabando gif");

    REPEAT_REC.style.display = "none";

    //sacar boton subir gifo
    BTN_NEWGIF_UPLOAD.style.display = "none";

    //se va la imagen
    RECORDED_GIF.style.display = "none";

    //funciones comenzar gifo pero sin texto
    //aparece boton grabar gifo
    BTN_NEWGIF_REC.style.display = "block";

    //funcion pedir permisos camara
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })

        //doy acceso: aparece la camara y el boton GRABAR. paso 2 activo
        .then(function (mediaStream) {

            //aparece el video
            VIDEO.style.display = "block";
            VIDEO.srcObject = mediaStream;
            VIDEO.onloadedmetadata = function (e) {
                VIDEO.play();
            };

            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })
}

// ·····  TO CALCULATE TIME
function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    return hr + ':' + min + ':' + sec;
}

// REND FAVORITES
function rendFavoritos () {
    console.log('function rendFavoritos')
    renderFavs()
    if (NEWGIF_SECTION.classList.contains('main-newgif')) {
      FAVORITES_SECTION.classList.remove('section-not-act')
      FAVORITES_SECTION.classList.add('section-act')
      NEWGIF_SECTION.classList.remove('main-newgif')
      NEWGIF_SECTION.style.display = "none"
      }
     else {(MISGIFS_SECTION.classList.contains('section-act')) 
      MISGIFS_SECTION.classList.remove('section-act')
      MISGIFS_SECTION.classList.add('section-not-act');
      FAVORITES_SECTION.classList.remove('section-not-act')
      FAVORITES_SECTION.classList.add('section-act')
     }
     
  }
  // REND MIS GIFS
  function rendMisgifs() {
    renderMisGifs()
    if (NEWGIF_SECTION.classList.contains('main-newgif')) {
      MISGIFS_SECTION.classList.remove('section-not-act')
      MISGIFS_SECTION.classList.add('section-act')
      NEWGIF_SECTION.classList.add('section-not-act')
      NEWGIF_SECTION.classList.remove('main-newgif')
      }
     else {(FAVORITES_SECTION.classList.contains('section-act')) 
      FAVORITES_SECTION.classList.remove('section-act')
      FAVORITES_SECTION.classList.add('section-not-act')
      MISGIFS_SECTION.classList.remove('section-not-act');
      MISGIFS_SECTION.classList.add('section-act')
     }
    }

