// =====================================
// OBTENER ID DEL INVITADO
// =====================================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// =====================================
// ABRIR SOBRE
// =====================================

function abrirSobre() {

  const musica = document.getElementById("musica");

  if (musica) {
    musica.play().catch(() => {
       musica.volume = 0.2; // volumen 40%
      console.log("El navegador bloqueó el autoplay.");
    });
  }

  const sobre = document.getElementById("sobre");

  sobre.style.transition = "all 1s ease";
  sobre.style.opacity = "0";

  setTimeout(() => {

    sobre.style.display = "none";

    document.getElementById("contenido").style.display = "block";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 1000);
}

// =====================================
// CARGAR DATOS DEL INVITADO
// =====================================

if (id) {

  fetch(`/api/invitados/${id}`)
    .then(res => {

      if (!res.ok) {
        throw new Error("Invitado no encontrado");
      }

      return res.json();
    })
    .then(data => {

      // Nombre en el sobre

      document.getElementById("nombre").innerText =
        data.nombre || "Invitado";

      // Boletos

      document.getElementById("boletos").innerText =
        `${data.boletos} boletos`;

      // Prellenar nombre en RSVP

      const nombreInput =
        document.getElementById("nombreInput");

      if (nombreInput) {
        nombreInput.value = data.nombre;
      }

    })
    .catch(error => {

      console.error(error);

      document.getElementById("nombre").innerText =
        "Invitado";

    });

}

// =====================================
// CONTADOR REGRESIVO
// =====================================

const fechaBoda =
  new Date("October 24, 2026 16:00:00").getTime();

function actualizarContador() {

  const ahora = new Date().getTime();

  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {

    document.getElementById("dias").innerText = "0";
    document.getElementById("horas").innerText = "0";
    document.getElementById("minutos").innerText = "0";

    return;
  }

  const dias =
    Math.floor(
      diferencia /
      (1000 * 60 * 60 * 24)
    );

  const horas =
    Math.floor(
      (diferencia %
        (1000 * 60 * 60 * 24))
      /
      (1000 * 60 * 60)
    );

  const minutos =
    Math.floor(
      (diferencia %
        (1000 * 60 * 60))
      /
      (1000 * 60)
    );

  document.getElementById("dias").innerText =
    dias;

  document.getElementById("horas").innerText =
    horas;

  document.getElementById("minutos").innerText =
    minutos;
}

actualizarContador();

setInterval(
  actualizarContador,
  1000
);

// =====================================
// GOOGLE MAPS
// =====================================

function abrirMapa(tipo) {

  let url = "";

  if (tipo === "ceremonia") {

    // CAMBIAR POR TU LINK

    url =
      "https://maps.app.goo.gl/pS9WisNm9eeXLL8E7";

  }

  if (tipo === "recepcion") {

    // CAMBIAR POR TU LINK

    url =
      "https://maps.app.goo.gl/hupwDtPbvziJn7pv5";

  }

  window.open(
    url,
    "_blank"
  );
}

// =====================================
// MESA DE REGALOS
// =====================================

function abrirMesaRegalos() {

  window.open(
    "https://www.amazon.com.mx/wedding/share/aleles",
    "_blank"
  );
}

// =====================================
// RSVP
// =====================================

 function confirmar() {

  const respuesta =
    document.getElementById("respuesta").value;

  const nombre =
    document.getElementById("nombreInput").value;

  const mensaje =
    document.getElementById("mensaje").value;

  fetch(
    "https://script.google.com/macros/s/AKfycbwUfjzMfc2kvqiUEOPqHC4UqfZ-Z2xXU3FM0VCZG8G8P-e44huhU_pHBjb6WrlrZpg8jQ/exec",
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        nombre,
        respuesta,
        mensaje

      })

    }
  )
  .then(() => {

    alert(
      "💕 Gracias por confirmar tu asistencia"
    );

  })
  .catch(error => {

    console.error(error);

    alert(
      "Ocurrió un error"
    );

  });

}

// =====================================
// EFECTO SUAVE AL CARGAR
// =====================================

window.addEventListener(
  "load",
  () => {

    document.body.style.opacity = "1";

  }
);