import doneLogo from "../../assets/Done.png";
import inProgressLogo from "../../assets/inprogress.svg";
import todoLogo from "../../assets/todo.svg";
import totalTasksLogo from "../../assets/total_task.svg";
import { TASK_STATUS } from "../../constants/taskStatus";
import type { TaskRecord } from "../../data/resourceData";

type TaskStatusCardsProps = {
  tasks: TaskRecord[];
};

type TaskStatusCardConfig = {
  label: string;
  image: string;
  iconClassName: string;
  textClassName: string;
  value: number;
};

const emptyStatusCounts: Record<TaskRecord["status"], number> = {
  [TASK_STATUS.BACKLOG]: 0,
  [TASK_STATUS.TODO]: 0,
  [TASK_STATUS.IN_PROGRESS]: 0,
  [TASK_STATUS.DONE]: 0,
};

export default function TaskStatusCards({ tasks }: TaskStatusCardsProps) {
  const statusCounts = tasks.reduce<Record<TaskRecord["status"], number>>((counts, task) => {
    counts[task.status] += 1;
    return counts;
  }, { ...emptyStatusCounts });

  const cardConfigs: TaskStatusCardConfig[] = [
    {
      label: "Total Tasks",
      image: totalTasksLogo,
      iconClassName: "bg-slate-100",
      textClassName: "text-slate-900",
      value: tasks.length,
    },  
    {
      label: TASK_STATUS.TODO,
      image: todoLogo,
      iconClassName: "bg-sky-100",
      textClassName: "text-sky-700",
      value: statusCounts[TASK_STATUS.TODO],
    },
    {
      label: TASK_STATUS.IN_PROGRESS,
      image: inProgressLogo,
      iconClassName: "bg-violet-100",
      textClassName: "text-violet-700",
      value: statusCounts[TASK_STATUS.IN_PROGRESS],
    },
    {
      label: TASK_STATUS.DONE,
      image: doneLogo,
      iconClassName: "bg-emerald-100",
      textClassName: "text-emerald-700",
      value: statusCounts[TASK_STATUS.DONE],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cardConfigs.map((card) => {
        const helperText =
          card.label === "Total Tasks"
            ? "Across all task stages"
            : `${Math.round((card.value / Math.max(tasks.length, 1)) * 100)}% of total tasks`;

        return (
          <article
            key={card.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          > 
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className={`mt-3 text-3xl font-bold ${card.textClassName}`}>{card.value}</p>
              </div>

              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconClassName}`}>
                <img src={card.image} alt={`${card.label} logo`} className="h-8 w-8 object-contain" />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">{helperText}</p>
          </article>
        );
      })}
    </div>
  );
}
