export default async function GetTask() {
  const response = await fetch("http://localhost:4000/task");
  if (!response.ok) {
    throw new Error("No se pudieron obtener las tareas");
  }
  return await response.json();
}
