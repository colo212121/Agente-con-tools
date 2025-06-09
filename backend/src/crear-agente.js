import { tool, agent } from "llamaindex";
import { Ollama } from "@llamaindex/ollama";
import { z } from "zod";
import { Estudiantes } from "../lib/estudiantes.js";

const estudiantes = new Estudiantes();
estudiantes.cargarEstudiantesDesdeJson();

const systemPrompt = `
Sos un asistente para gestionar estudiantes.
Tu tarea es ayudar a consultar o modificar una base de datos de alumnos.

Usá las herramientas disponibles para:
- Buscar estudiantes por nombre o apellido
- Agregar nuevos estudiantes
- Mostrar la lista completa de estudiantes

Respondé de forma clara y breve.
`.trim();

const ollamaLLM = new Ollama({
    model: "qwen3:1.7b",
    temperature: 0.75,
    timeout: 2 * 60 * 1000,
});

const buscarPorNombreTool = tool({
    name: "buscarPorNombre",
    description: "Usa esta función para encontrar estudiantes por su nombre",
    parameters: z.object({
      nombre: z.string().describe("El nombre del estudiante a buscar"),
    }),
    execute: ({ nombre }) => {
      const estudiantesNombre = estudiantes.buscarEstudiantePorNombre(nombre);
      if (estudiantesNombre.length === 0) return "No se encontraron estudiantes con ese nombre.";
      const resultado = estudiantesNombre.map(est => `Nombre: ${est.nombre}, Apellido: ${est.apellido}, Curso: ${est.curso}`).join('\n');
      return resultado;
    },
});

const buscarPorApellidoTool = tool({
    name: "buscarPorApellido",
    description: "Usa esta función para encontrar estudiantes por su apellido",
    parameters: z.object({
        apellido: z.string().describe("El apellido del estudiante a buscar"),
    }),
    execute: ({ apellido }) => {
        const estudiantesApellido = estudiantes.buscarEstudiantePorApellido(apellido);
        if (estudiantesApellido.length === 0) return "No se encontraron estudiantes con ese apellido.";
        const resultado = estudiantesApellido.map(est => `Nombre: ${est.nombre}, Apellido: ${est.apellido}, Curso: ${est.curso}`).join('\n');
        return resultado;
    },
});

const agregarEstudianteTool = tool({
    name: "agregarEstudiante",
    description: "Usa esta función para agregar un nuevo estudiante",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante"),
        apellido: z.string().describe("El apellido del estudiante"),
        curso: z.string().describe("El curso del estudiante (ej: 4A, 4B, 5A)"),
    }),
    execute: ({ nombre, apellido, curso }) => {
      try {
        estudiantes.agregarEstudiante(nombre, apellido, curso);
        return `Se agregó correctamente a ${nombre} ${apellido}.`;
      } catch (error) {
        return error.message;
      }
    },
});

const listarEstudiantesTool = tool({
    name: "listarEstudiantes",
    description: "Usa esta función para mostrar todos los estudiantes",
    parameters: z.object({}),
    execute: () => {
      const lista = estudiantes.listarEstudiantes();
      if (lista.length === 0) return "No hay estudiantes registrados.";
      return lista.map(est => `Nombre: ${est.nombre}, Apellido: ${est.apellido}, Curso: ${est.curso}`).join('\n');
    },
});

// SOLO exportá la función, no crees ni ejecutes el agente acá
export function crearAgenteEstudiantes({ verbose = true } = {}) {
    return agent({
        tools: [buscarPorNombreTool, buscarPorApellidoTool, agregarEstudianteTool, listarEstudiantesTool],
        llm: ollamaLLM,
        verbose,
        systemPrompt,
    });
}