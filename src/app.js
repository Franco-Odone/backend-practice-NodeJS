import express from "express";
import { routerProgramacion } from "./routers/programacion.js";
import { routerMatematicas } from "./routers/matematicas.js";
// Simulación DB
import { infoCursos } from "./data/cursos.js";

// Definimos una app de express
const app = express();
// Middleware
app.use(express.json());

// Use-Routers
app.use("/api/cursos/programacion", routerProgramacion);
app.use("/api/cursos/matematicas", routerMatematicas);

// Routing
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.get("/api/cursos", (req, res) => {
  res.json(infoCursos);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening in Port: ${PORT}`);
});
