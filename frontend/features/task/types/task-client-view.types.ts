import type { Task } from "@/types/task";

export type TaskClientViewProps = {
  taskData: Task[];
  title?: string;
  showFilter?: boolean;
};
