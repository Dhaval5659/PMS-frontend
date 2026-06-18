import Buttons from "./Buttons";
import dashboardImage from "../../assets/dashboard.png";
import membersImage from "../../assets/members.png";
import organizationsImage from "../../assets/organization.png";
import projectsImage from "../../assets/Project.png";
import tasksImage from "../../assets/task.png";

export default function Sidebar() {
  const menuItems = [
    { image: dashboardImage, label: "Dashboard", to: "/dashboard" },
    { image: membersImage, label: "Members", to: "/members" },
    { image: organizationsImage, label: "Organizations", to: "/organizations" },
    { image: projectsImage, label: "Projects", to: "/projects" },
    { image: tasksImage, label: "Tasks", to: "/tasks" },
  ];
  return (
    <aside className="w-56 border-r flex flex-col p-4">
      <span className="font-bold text-lg mb-4">PMS</span>
      {menuItems.map((item) => (
        <Buttons key={item.label} image={item.image} label={item.label} to={item.to} />
      ))}
    </aside>
  );
}
