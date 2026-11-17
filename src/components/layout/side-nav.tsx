import Link from "next/link";
import { NavLink } from "./nav-link";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function SideNav() {
  return (
    <header className="px-6 pt-6 pb-8 lg:sticky lg:top-0 lg:h-dvh lg:px-16 lg:pt-8 print:hidden">
      <Link
        href="/"
        className="text-lg tracking-[0.2em] uppercase font-stretch-expanded"
      >
        Tilo Hauk
      </Link>
      <nav aria-label="Main" className="mt-8 lg:mt-28">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
