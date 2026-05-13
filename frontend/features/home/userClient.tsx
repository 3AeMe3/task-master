"use client";
import useUserData from "@/hooks/use-user-data";

export default function UserClient() {
  const { data, loading, error } = useUserData();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error..</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-black">
        Buenas Tardes, {data?.name}
      </h2>
      <p className="text-black/60">
        Aqui esta un resumen de tu dia, lo estas haciendo muy bien!
      </p>
    </div>
  );
}
