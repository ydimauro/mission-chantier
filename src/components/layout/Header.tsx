"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, APP_TAGLINE } from "@content/config";
import { NAV_ITEMS } from "@content/navigation";
import { AppMark } from "@/components/ui/AppMark";
import { BookIcon, BriefcaseIcon, ChartBarIcon, HomeIcon, TargetIcon } from "@/components/ui/icons";
import { LevelSwitch } from "@/components/layout/LevelSwitch";
import { UserBadge } from "@/components/layout/UserBadge";

function NavigationIcon({ href }: { href: string }) {
  switch (href) {
    case "/":
      return <HomeIcon className="h-4 w-4" />;
    case "/mission":
      return <TargetIcon className="h-4 w-4" />;
    case "/carnet":
      return <BookIcon className="h-4 w-4" />;
    case "/ressources":
      return <BriefcaseIcon className="h-4 w-4" />;
    case "/progression":
      return <ChartBarIcon className="h-4 w-4" />;
  }
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <AppMark size={34} />
          <span className="leading-tight">
            <span className="block text-base font-bold text-ink">
              {APP_NAME.split(" ")[0]}{" "}
              <span className="text-brand">
                {APP_NAME.split(" ").slice(1).join(" ")}
              </span>
            </span>
            <span className="block text-[11px] text-ink-muted">{APP_TAGLINE}</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="min-w-0 flex-1">
          <ul className="flex min-w-max items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`relative flex min-h-9 items-center gap-1.5 px-2 text-xs font-semibold text-ink-muted hover:bg-surface-muted hover:text-ink ${pathname === item.href ? "text-ink after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-brand" : ""}`}
                >
                  <NavigationIcon href={item.href} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <LevelSwitch />
          <UserBadge />
        </div>
      </div>
    </header>
  );
}
