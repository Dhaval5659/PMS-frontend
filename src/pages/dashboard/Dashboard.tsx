import TaskStatusCards from "./TaskStatusCards";
import { TASK_STATUS } from "../../constants/taskStatus";
import { tasks, type TaskRecord } from "../../data/resourceData";

const priorityClasses: Record<TaskRecord["priority"], string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-rose-100 text-rose-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const statusClasses: Record<TaskRecord["status"], string> = {
  [TASK_STATUS.BACKLOG]: "bg-orange-100 text-orange-700",
  [TASK_STATUS.TODO]: "bg-sky-100 text-sky-700",
  [TASK_STATUS.IN_PROGRESS]: "bg-violet-100 text-violet-700",
  [TASK_STATUS.DONE]: "bg-emerald-100 text-emerald-700",
};

export default function Dashboard() {
  const highPriorityTasks = tasks.filter(({ priority }) => priority === "HIGH").length;
  const criticalPriorityTasks = tasks.filter(({ priority }) => priority === "CRITICAL").length;
  const activeTasks = tasks.filter(
    ({ status }) => status === TASK_STATUS.TODO || status === TASK_STATUS.IN_PROGRESS,
  ).length;
  const completedTasks = tasks.filter(({ status }) => status === TASK_STATUS.DONE).length;

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track how work is distributed across stages and keep an eye on the tasks that need attention.
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="rounded-full bg-rose-50 px-3 py-1 font-medium text-rose-700">
            High: {highPriorityTasks}
          </span>
          <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-700">
            Critical: {criticalPriorityTasks}
          </span>
          <span className="rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700">
            Active Tasks: {activeTasks}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            Completed: {completedTasks}
          </span>
        </div>
      </div>

      <TaskStatusCards tasks={tasks} />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Task Snapshot</h2>
            <p className="mt-1 text-sm text-gray-600">
              Shared task data powers both the dashboard cards and the task listing page.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            {tasks.length} Tasks
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">{task.title}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {task.id} | {task.assignee}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClasses[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
