import { useState, useEffect } from "react";
import getUser from "@/lib/api/getUser";

type userData = {
  id: number;
  name: string;
  email: string;
};
export default function useUserData() {
  const [data, setData] = useState<userData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser()
      .then((data) => {
        setData(data);
        setLoading(true);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}
