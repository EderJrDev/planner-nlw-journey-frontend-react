import { format } from "date-fns";
import { CircleCheck } from "lucide-react";
import { useActivities } from "../../context/activities/use-activities";
import { Activity } from "../../context/activities/context";

export function Activities() {
  const { activities } = useActivities();
  return (
    <div className="space-y-8">
      {activities?.map((activity) => (
        <div key={activity.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date ,'dd-MM')}</span>
            <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE')}</span>
          </div>
          {activity.activities.length > 0 ? (
          <>
            {activity.activities.map((activitie: Activity) => (
            <div key={activitie.id} className="space-y-2.5">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                <CircleCheck className="size-5 text-lime-300" />
                <span className="text-zinc-100">{activitie.title}</span>
                <span className="text-zinc-400 text-sm ml-auto">{format(activitie.occurs_at, 'HH:mm')}h</span>
              </div>
            </div>
            ))}
          </>
          ) : (
            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          )}
        </div>
      ))}
    </div>
  )
}