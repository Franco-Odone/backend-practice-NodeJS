import { Router } from "express";
import { infoCursos } from "../data/cursos.js";

// Router
const routerProgramacion = Router();

// Routing
routerProgramacion.get("/", (req, res) => {
  res.json(infoCursos.programacion);
});

routerProgramacion.get("/:language", (req, res) => {
  let { language } = req.params;
  let result = infoCursos.programacion.filter(
    (cursos) => cursos.tema === language
  );

  if (result.length === 0) return res.status(404).end();

  if (req.query.order === "views")
    return res.json(result.sort((a, b) => a.vistas - b.vistas));

  res.json(result);
});

// Búsqueda con dos o más parámetros

routerProgramacion.get("/:language/:level", (req, res) => {
  let { language, level } = req.params;
  let result = infoCursos.programacion.filter(
    (cursos) => cursos.tema === language && cursos.nivel === level
  );

  if (result.length === 0) return res.status(404).end();

  res.json(result);
});

// POST
routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  infoCursos.programacion.push(cursoNuevo);
  res.json(infoCursos.programacion);
});

// PUT
routerProgramacion.put("/:id", (req, res) => {
  let cursoActualizado = req.body;
  let id = req.params.id;

  let index = infoCursos.programacion.findIndex(
    (curso) => curso.id === Number(id)
  );

  if (index >= 0) {
    infoCursos.programacion[index] = cursoActualizado;
  } else {
    res.status(404).end();
  }

  res.json(infoCursos.programacion);
});

// PATCH
routerProgramacion.patch("/:id", (req, res) => {
  let infoActualizada = req.body;
  let id = req.params.id;

  let index = infoCursos.programacion.findIndex(
    (curso) => curso.id === Number(id)
  );

  if (index >= 0) {
    let cursoAModificar = infoCursos.programacion[index];
    Object.assign(cursoAModificar, infoActualizada);
  } else {
    res.status(404).end();
  }

  res.json(infoCursos.programacion);
});

// DELETE
routerProgramacion.delete("/:id", (req, res) => {
  let id = req.params.id;

  let cursoEliminado = infoCursos.programacion.filter(
    (curso) => curso.id !== Number(id)
  );
  infoCursos.programacion = cursoEliminado;

  res.json(cursoEliminado);
});

export { routerProgramacion };
