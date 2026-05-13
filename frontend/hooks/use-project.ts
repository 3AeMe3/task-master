import { getProjects } from "@/lib/api/projets";
import { useState, useEffect } from "react";

type DataType = {
  id: number;
  name: string;
  userId: number;
};

type ProjectProps = {
  data: DataType | null;
  loading: boolean;
  error: string | null;
};

export default function useProject(): ProjectProps {
  const [data, setData] = useState<DataType | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Unexpected Error";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
