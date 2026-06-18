import { NavLink } from "react-router-dom";
import type { ButtonProps } from "../../types/auth.types";

export default function Buttons({ image, label, to }: ButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${
          isActive
            ? "bg-gray-200 text-gray-900"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <img
        src={image}
        alt=""
        className="h-8 w-8 shrink-0 object-contain"
        aria-hidden="true"
      />
      <span>{label}</span>
    </NavLink>
  );
}
