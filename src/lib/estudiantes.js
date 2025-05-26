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
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  agregarEstudiante(nombre, apellido, curso) {
    console.log("Intentando agregar estudiante:", { nombre, apellido, curso });

    const existe = this.estudiantes.some(est => 
      est.nombre.toLowerCase() === nombre.toLowerCase() &&
      est.apellido.toLowerCase() === apellido.toLowerCase() &&
      est.curso.toLowerCase() === curso.toLowerCase()
    );

    if (existe) {
      throw new Error("El estudiante ya existe.");
    }

    const nuevoEstudiante = { nombre, apellido, curso };
    this.estudiantes.push(nuevoEstudiante);
    this.guardarEstudiantes();
  }

  buscarEstudiantePorNombre(nombre) {
    return this.estudiantes.filter(est => est.nombre.toLowerCase() === nombre.toLowerCase());
  }

  buscarEstudiantePorApellido(apellido) {
    return this.estudiantes.filter(est => est.apellido.toLowerCase() === apellido.toLowerCase());
  }

  listarEstudiantes() {
    return this.estudiantes;
  }
}

export { Estudiantes };
