"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/zone/1/space", label: "모각존 관리" },
  { href: "/zone/1/member", label: "멤버 관리" },
];

export default function ZoneDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex flex-grow w-full">
      <aside className="w-1/5 min-w-[200px] border-r px-6 py-8 bg-gray-50 dark:bg-background-dark">
        <nav className="flex flex-col gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname.startsWith(href)
                  ? "font-bold text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              } transition-colors`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
