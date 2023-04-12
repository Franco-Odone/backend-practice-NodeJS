import express from "express";
// Simulación DB
import { infoCursos } from "./cursos.js";

// definimos una app de express
const app = express();

// Routing
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/cursos", (req, res) => {
  res.send(infoCursos);
});

app.get("/api/cursos/programacion", (req, res) => {
  res.send(infoCursos.programacion);
});

app.get("/api/cursos/matematicas", (req, res) => {
  res.send(infoCursos.matematicas);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening in Port: ${PORT}`);
});
