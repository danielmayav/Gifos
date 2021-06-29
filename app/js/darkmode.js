// MODO NOCTURNO

function diurnoNocturno() {
    if (modo.innerHTML === "MODO NOCTURNO" & modoMob.innerHTML === "MODO NOCTURNO") {
      modo.innerHTML = "MODO DIURNO";
      modoMob.innerHTML = "MODO DIURNO";
      body.classList.add('dark');
     
    } else {
      modo.innerHTML = "MODO NOCTURNO";
      modoMob.innerHTML = "MODO NOCTURNO";
      body.classList.remove('dark');
     
    }};