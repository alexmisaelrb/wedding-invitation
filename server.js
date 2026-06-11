const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const invitadosRoutes = require("./routes/invitados");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/invitados", invitadosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto $(PORT)`);
});