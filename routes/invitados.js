const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DB_PATH = path.join(__dirname, "../data/invitados.json");

// Leer BD
const leerInvitados = () => {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
};

// Guardar BD
const guardarInvitados = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Crear invitado
router.post("/", (req, res) => {
  const invitados = leerInvitados();

  const nuevo = {
    id: uuidv4(),
    nombre: req.body.nombre,
    boletos: req.body.boletos,
    mesa: req.body.mesa,
    asistencia: false
  };

  invitados.push(nuevo);
  guardarInvitados(invitados);

  res.json(nuevo);
});

// Obtener invitado por ID
router.get("/:id", (req, res) => {
  const invitados = leerInvitados();
  const invitado = invitados.find(i => i.id === req.params.id);

  if (!invitado) {
    return res.status(404).json({ error: "No encontrado" });
  }

  res.json(invitado);
});

// Confirmar asistencia
router.post("/confirmar/:id", (req, res) => {
  const invitados = leerInvitados();
  const index = invitados.findIndex(i => i.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "No encontrado" });
  }

invitados[index].respuesta = req.body.respuesta;
invitados[index].nombreConfirmacion = req.body.nombre;
invitados[index].mensaje = req.body.mensaje;
invitados[index].fechaConfirmacion = new Date().toISOString();

invitados[index].asistencia =
  req.body.respuesta === "si" ||

  guardarInvitados(invitados);

  res.json({ mensaje: "Confirmación guardada 💕" });
});

module.exports = router;