import type { Task } from "./task.types";

export type TaskTableItemsProps = {
  task: Task;
  onHandleClick: (task: Task) => void;
};
