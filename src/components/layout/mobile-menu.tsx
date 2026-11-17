"use client";

import { usePathname } from "next/navigation";

// A native <details> works without JavaScript. Keying it by the path remounts it
// (closed) after every client-side navigation.
export function MobileMenu({ children }: { children: React.ReactNode }) {
  return (
    <details key={usePathname()} className="group lg:hidden">
      <summary className="cursor-pointer list-none text-sm tracking-[0.2em] uppercase [&::-webkit-details-marker]:hidden">
        Menu{" "}
        <span
          aria-hidden
          className="inline-block transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="absolute inset-x-0 top-full z-10 border-b border-ink/20 bg-cream px-6 pt-2 pb-8">
        {children}
      </div>
    </details>
  );
}
