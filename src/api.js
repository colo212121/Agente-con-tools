export async function enviarMensajeAlBackend(mensaje) {
  const res = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: mensaje }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al comunicar con el backend');
  }
  const data = await res.json();
  return data.response;
}