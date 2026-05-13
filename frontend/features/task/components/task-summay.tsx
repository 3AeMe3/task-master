import { Card } from "@/components/ui/card";

type TaskSummaryProps = {
  completedCount: number;
  overdueCount: number;
  pendingCount: number;
  totalCount: number;
};

export default function TaskSummary({
  completedCount,
  overdueCount,
  pendingCount,
  totalCount,
}: TaskSummaryProps) {
  return (
    <Card className="h-full w-full p-5 xl:max-w-sm">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold">Resumen rápido</h3>
          <p className="text-sm text-black/50">
            Estado actual de tus tareas visibles en el dashboard.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-black">
          <div className="rounded-xl bg-[#f3f4f6] p-4">
            <p className="text-sm text-black/50">Total</p>
            <p className="text-2xl font-semibold">{totalCount}</p>
          </div>
          <div className="rounded-xl bg-[#dcfce7] p-4">
            <p className="text-sm text-black/50">Completadas</p>
            <p className="text-2xl font-semibold">{completedCount}</p>
          </div>
          <div className="rounded-xl bg-[#fef3c7] p-4">
            <p className="text-sm text-black/50">Pendientes</p>
            <p className="text-2xl font-semibold">{pendingCount}</p>
          </div>
          <div className="rounded-xl bg-[#fee2e2] p-4">
            <p className="text-sm text-black/50">Vencidas</p>
            <p className="text-2xl font-semibold">{overdueCount}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
