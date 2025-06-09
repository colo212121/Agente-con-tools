import React, { useState } from 'react';
import Chat from './chat';
import { enviarMensajeAlBackend } from './api';

export default function App() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMensajes([...mensajes, { rol: 'user', texto: input }]);
    setLoading(true);
    setError('');
    setInput('');
    try {
      const respuesta = await enviarMensajeAlBackend(input);
      let textoPlano;

      if (respuesta?.data?.result) {
        // Borra cualquier bloque <think> ... </think> con tolerancia a espacios y case-insensitive
        textoPlano = respuesta.data.result.replace(/<\s*think\s*>[\s\S]*?<\s*\/\s*think\s*>/gi, '').trim();
      } else if (typeof respuesta === 'string') {
        textoPlano = respuesta;
      } else {
        textoPlano = JSON.stringify(respuesta);
      }

      setMensajes(ms => [...ms, { rol: 'asistente', texto: textoPlano }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">🧠 Chat con el Asistente</h1>
        <Chat mensajes={mensajes} loading={loading} />
        <form className="mt-4 flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribí tu pregunta..."
            disabled={loading}
          />
          <button className="bg-blue-500 text-white px-4 rounded" disabled={loading}>
            Enviar
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}