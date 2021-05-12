// MODO NOCTURNO

function diurnoNocturno() {
    const body = document.body;
    var modo = document.getElementById("modnoct-btn");
    if (modo.innerHTML === "MODO NOCTURNO") {
      modo.innerHTML = "MODO DIURNO";
      body.classList.add('dark');
     
    } else {
      modo.innerHTML = "MODO NOCTURNO";
      body.classList.remove('dark');
     
    }};