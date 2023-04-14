import express from "express";
// Simulación DB
import { infoCursos } from "./cursos.js";

// definimos una app de express
const app = express();

// Routing
app.get("/", (req, res) => {
  res.send(
    JSON.stringify({
      message: "Hello World!",
    })
  );
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

// Programación
app.get("/api/cursos/programacion", (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
});

app.get("/api/cursos/programacion/:language", (req, res) => {
  let { language } = req.params;
  let result = infoCursos.programacion.filter(
    (cursos) => cursos.tema === language
  );

  if (result.length === 0)
    return res.status(404).send(`language ${language} not found`);

  if (req.query.order === "views")
    return res.send(JSON.stringify(result.sort((a, b) => a.vistas - b.vistas)));

  res.send(JSON.stringify(result));
});

// Búsqueda con dos o más parámetros

app.get("/api/cursos/programacion/:language/:level", (req, res) => {
  let { language, level } = req.params;
  let result = infoCursos.programacion.filter(
    (cursos) => cursos.tema === language && cursos.nivel === level
  );

  if (result.length === 0)
    return res
      .status(404)
      .send(`language ${language} level ${level} not found`);

  res.send(JSON.stringify(result));
});

// Matemáticas
app.get("/api/cursos/matematicas", (req, res) => {
  res.send(JSON.stringify(infoCursos.matematicas));
});

app.get("/api/cursos/matematicas/:subject", (req, res) => {
  let { subject } = req.params;
  let result = infoCursos.matematicas.filter(
    (cursos) => cursos.tema === subject
  );

  if (result.length === 0)
    return res.status(404).send(`subject ${subject} not found`);

  if (req.query.order === "views")
    return res.send(JSON.stringify(result.sort((a, b) => a.vistas - b.vistas)));

  res.send(JSON.stringify(result));
});

// Búsqueda con dos o más parámetros

app.get("/api/cursos/matematicas/:subject/:level", (req, res) => {
  let { subject, level } = req.params;
  let result = infoCursos.matematicas.filter(
    (cursos) => cursos.tema === subject && cursos.nivel === level
  );

  if (result.length === 0)
    return res.status(404).send(`subject ${subject} level ${level} not found`);

  res.send(JSON.stringify(result));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening in Port: ${PORT}`);
});
