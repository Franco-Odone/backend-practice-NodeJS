import { Router } from "express";
import { infoCursos } from "../data/cursos.js";

// Router
const routerMatematicas = Router();

// Routing
routerMatematicas.get("/", (req, res) => {
  res.json(infoCursos.matematicas);
});

routerMatematicas.get("/:subject", (req, res) => {
  let { subject } = req.params;
  let result = infoCursos.matematicas.filter(
    (cursos) => cursos.tema === subject
  );

  if (result.length === 0) return res.status(404).end();

  if (req.query.order === "views")
    return res.json(result.sort((a, b) => a.vistas - b.vistas));

  res.json(result);
});

// Búsqueda con dos o más parámetros

routerMatematicas.get("/:subject/:level", (req, res) => {
  let { subject, level } = req.params;
  let result = infoCursos.matematicas.filter(
    (cursos) => cursos.tema === subject && cursos.nivel === level
  );

  if (result.length === 0) return res.status(404).end();

  res.json(result);
});

// POST
routerMatematicas.post("/", (req, res) => {
  let cursoNuevo = req.body;
  infoCursos.matematicas.push(cursoNuevo);
  res.json(infoCursos.matematicas);
});

// PUT
routerMatematicas.put("/:id", (req, res) => {
  let cursoActualizado = req.body;
  let id = req.params.id;

  let index = infoCursos.matematicas.findIndex(
    (curso) => curso.id === Number(id)
  );

  if (index >= 0) {
    infoCursos.matematicas[index] = cursoActualizado;
  } else {
    res.status(404).end();
  }

  res.json(infoCursos.matematicas);
});

// PATCH
routerMatematicas.patch("/:id", (req, res) => {
  let infoActualizada = req.body;
  let id = req.params.id;

  let index = infoCursos.matematicas.findIndex(
    (curso) => curso.id === Number(id)
  );

  if (index >= 0) {
    let cursoAModificar = infoCursos.matematicas[index];
    Object.assign(cursoAModificar, infoActualizada);
  } else {
    res.status(404).end();
  }

  res.json(infoCursos.matematicas);
});

// DELETE
routerMatematicas.delete("/:id", (req, res) => {
  let id = req.params.id;

  let cursoEliminado = infoCursos.matematicas.filter(
    (curso) => curso.id !== Number(id)
  );
  infoCursos.matematicas = cursoEliminado;

  res.json(cursoEliminado);
});

export { routerMatematicas };
