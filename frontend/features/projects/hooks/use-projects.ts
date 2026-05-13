import { useEffect, useState } from "react";

import type { Project } from "../types/project.types";
import { getProjectsClient } from "../services/project-client";

type UseProjectsResult = {
  data: Project[];
  loading: boolean;
  error: string | null;
};

export default function useProjects(): UseProjectsResult {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjectsClient()
      .then((projects) => {
        setData(projects);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Unexpected Error";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
