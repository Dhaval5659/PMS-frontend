import { TASK_STATUS, type TaskStatus } from "../constants/taskStatus";

export type MemberRecord = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Invited" | "Offline";
};

export type OrganizationRecord = {
  id: string;
  name: string;
  owner: string;
  members: number;
  plan: "Starter" | "Growth" | "Enterprise";
};

export type ProjectRecord = {
  id: string;
  name: string;
  lead: string;
  progress: string;
  status: "On Track" | "At Risk" | "Completed";
};

export type TaskRecord = {
  id: string;
  title: string;
  assignee: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: TaskStatus;
};

export const members: MemberRecord[] = [];

export const organizations: OrganizationRecord[] = [];

export const projects: ProjectRecord[] = [];

export const tasks: TaskRecord[] = [
  {
    id: "TSK-101",
    title: "Finalize dashboard wireframes",
    assignee: "Aarav Patel",
    priority: "HIGH",
    status: TASK_STATUS.IN_PROGRESS,
  },
  {
    id: "TSK-102",
    title: "Review onboarding email copy",
    assignee: "Diya Shah",
    priority: "MEDIUM",
    status: TASK_STATUS.TODO,
  },
  {
    id: "TSK-103",
    title: "Set up sprint planning template",
    assignee: "Rohan Mehta",
    priority: "LOW",
    status: TASK_STATUS.BACKLOG,
  },
  {
    id: "TSK-104",
    title: "Implement task activity feed",
    assignee: "Nisha Verma",
    priority: "CRITICAL",
    status: TASK_STATUS.IN_PROGRESS,
  },
  {
    id: "TSK-105",
    title: "QA test project creation flow",
    assignee: "Kabir Rao",
    priority: "MEDIUM",
    status: TASK_STATUS.DONE,
  },
  {
    id: "TSK-106",
    title: "Prepare resource usage report",
    assignee: "Mira Joshi",
    priority: "LOW",
    status: TASK_STATUS.TODO,
  },
  {
    id: "TSK-107",
    title: "Backlog grooming for release 2.1",
    assignee: "Aanya Kapoor",
    priority: "MEDIUM",
    status: TASK_STATUS.BACKLOG,
  },
  {
    id: "TSK-108",
    title: "Fix overdue task notification bug",
    assignee: "Ishaan Nair",
    priority: "HIGH",
    status: TASK_STATUS.DONE,
  },
];
