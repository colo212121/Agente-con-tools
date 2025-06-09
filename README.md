# Entregable: Sistema de Gestión de Estudiantes con LLM Tools

Este proyecto es un entregable para implementar un sistema de gestión de estudiantes utilizando LLMs (Large Language Models) y Tools.

![Estructura de carpetas del proyecto](image1)

## 📚 Requisitos Previos

- Node.js >= 18
- [Ollama](https://ollama.com/) instalado y corriendo
- Modelo `qwen3:1.7b` instalado

## 🛠 Instalación

1. Instala las dependencias:
    ```bash
    npm install
    ```

2. Asegúrate de tener Ollama corriendo y el modelo instalado:
    ```bash
    ollama run qwen3:1.7b
    ```

## 🎯 Tu Tarea

Debes implementar las siguientes funcionalidades:

1. En `backend/lib/estudiantes.js`:
    - Método `agregarEstudiante(nombre, apellido, curso)`
    - Método `buscarEstudiantePorNombre(nombre)`
    - Método `buscarEstudiantePorApellido(apellido)`
    - Método `listarEstudiantes()`

2. En `backend/src/ejemplo-alumnos-tools.js` (o `crear-agente.js`, según corresponda):
    - Tool `buscarPorNombre`
    - Tool `buscarPorApellido`
    - Tool `agregarEstudiante`
    - Tool `listarEstudiantes`

## 💡 Ayuda

- Cada método y Tool tiene comentarios TODO indicando dónde implementar el código.
- Revisa la documentación de llamaindex para entender cómo funcionan las Tools.
- Utiliza la clase `Estudiantes` para manejar los datos.
- Las Tools deben usar los métodos de la clase `Estudiantes`.

## 🚀 Para Ejecutar

- **Backend:**  
    ```bash
    npm run back
    ```
- **Frontend:**  
    ```bash
    npm start
    ```

## 📝 Notas

- El código base ya incluye:
    - Interfaz CLI funcional
    - Formateo de respuestas
    - Manejo básico de archivos
    - Estructura del proyecto (ver imagen)
- No modifiques:
    - La estructura de los archivos
    - Los nombres de los métodos/Tools
    - Los parámetros definidos

## 📚 Recursos

- [Documentación de LlamaIndex](https://docs.llamaindex.ai/)
- [Documentación de Zod](https://zod.dev/)
- [Ejemplos de Tools](https://docs.llamaindex.ai/en/stable/examples/tools/)

## 📦 package.json relevante

```json
{
  "name": "ejemplo-llm-1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "back": "node backend/src/index.js",
    "start": "react-scripts start"
  },
  "dependencies": {
    "@llamaindex/ollama": "^0.1.5",
    "chalk": "^5.4.1",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "llamaindex": "^0.10.6",
    "morgan": "^1.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "^5.0.1",
    "zod": "^3.24.4"
  },
  "type": "module"
}
```

---

> **Importante:**  
> La estructura del proyecto se muestra en la imagen incluida arriba.  
> - Los archivos principales del backend están en `/backend`.
> - Los archivos frontend (React) están en `/src`.
> - Los datos de alumnos se guardan en `backend/data/alumnos.json`.

---