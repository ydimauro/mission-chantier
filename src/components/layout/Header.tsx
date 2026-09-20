import Link from "next/link";
import { APP_NAME, APP_TAGLINE } from "@content/config";
import { NAV_ITEMS } from "@content/navigation";
import { AppMark } from "@/components/ui/AppMark";
import { LevelSwitch } from "@/components/layout/LevelSwitch";
import { UserBadge } from "@/components/layout/UserBadge";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <AppMark size={40} />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-ink">
              {APP_NAME.split(" ")[0]}{" "}
              <span className="text-brand">
                {APP_NAME.split(" ").slice(1).join(" ")}
              </span>
            </span>
            <span className="block text-sm text-ink-muted">{APP_TAGLINE}</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LevelSwitch />
          <UserBadge />
        </div>
      </div>
    </header>
  );
}
