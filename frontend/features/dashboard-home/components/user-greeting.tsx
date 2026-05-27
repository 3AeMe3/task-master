import type { CurrentUser } from "../types/current-user.types";

type UserGreetingProps = {
  user: CurrentUser;
};

export default function UserGreeting({ user }: UserGreetingProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">
        Buenas Tardes, {user.name}
      </h2>
      <p className="text-black/60">
        Aqui esta un resumen del día de Hoy, lo estas haciendo muy bien!
      </p>
    </div>
  );
}
