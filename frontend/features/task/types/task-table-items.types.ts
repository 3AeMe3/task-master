import { Task } from "@/types/task";

export type TaskTableItemsProps = {
  task: Task;
  onHandleClick: (task: Task) => void;
};
