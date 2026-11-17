"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname().startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="text-2xl font-extrabold tracking-[0.12em] text-plum uppercase font-stretch-expanded transition-colors hover:text-plum-soft aria-[current=page]:text-plum-soft lg:text-nav"
    >
      {children}
    </Link>
  );
}
