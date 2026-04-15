import { Status } from "@/lib/types/status.types";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
}
