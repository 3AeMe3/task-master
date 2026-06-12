import type { Task } from "./task.types";

export type TaskClientViewProps = {
  taskData: Task[];
  title?: string;
  showFilter?: boolean;
};
