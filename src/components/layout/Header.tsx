import Profile from "./Profile";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <span className="font-semibold">PMS</span>
      <Profile />
    </header>
  );
}
