import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function SideNav() {
  // Rendered twice (desktop column, mobile menu); only one is ever visible,
  // so assistive technology sees a single "Main" navigation.
  const links = (
    <ul className="flex flex-col gap-3">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href}>{item.label}</NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 lg:sticky lg:top-0 lg:block lg:h-dvh lg:px-16 lg:pt-8 print:hidden">
      <Link
        href="/"
        className="text-lg tracking-[0.2em] uppercase font-stretch-expanded"
      >
        Tilo Hauk
      </Link>
      <nav aria-label="Main" className="hidden lg:mt-28 lg:block">
        {links}
      </nav>
      <MobileMenu>
        <nav aria-label="Main">{links}</nav>
      </MobileMenu>
    </header>
  );
}
