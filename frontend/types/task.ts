type Status = "PENDIENTE" | "COMPLETADO" | "VENCIDO";
type Priority = "BAJO" | "NORMAL" | "URGENTE";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}
