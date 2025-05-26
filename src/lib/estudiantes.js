// Gestión de estudiantes
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }
  
  cargarEstudiantesDesdeJson() {
    try {
      const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      this.estudiantes = data.alumnos || [];
    } catch (e) {
      console.error("Error al leer el archivo de datos:", e);
    }
  }

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  // Agrega un nuevo estudiante a la lista y guarda los cambios
  agregarEstudiante(nombre, apellido, curso) {
    const nuevoEstudiante = { nombre, apellido, curso };
    this.estudiantes.push(nuevoEstudiante);
    this.guardarEstudiantes();
  }

  // Busca estudiantes cuyo nombre coincida (case insensitive)
  buscarEstudiantePorNombre(nombre) {
    return this.estudiantes.filter(est => est.nombre.toLowerCase() === nombre.toLowerCase());
  }

  // Busca estudiantes cuyo apellido coincida (case insensitive)
  buscarEstudiantePorApellido(apellido) {
    return this.estudiantes.filter(est => est.apellido.toLowerCase() === apellido.toLowerCase());
  }

  // Devuelve la lista completa de estudiantes
  listarEstudiantes() {
    return this.estudiantes;
  }
}

export { Estudiantes }
