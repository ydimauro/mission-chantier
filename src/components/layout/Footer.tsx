import Link from "next/link";
import { COPYRIGHT_TEXT } from "@content/config";
import { FOOTER_PRIVACY_LINK_LABEL } from "@content/navigation";
import { AccessibilityBar } from "@/components/layout/AccessibilityBar";
import { ShieldIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
        <AccessibilityBar />
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-sm text-ink-muted">
          <p>{COPYRIGHT_TEXT}</p>
          <Link href="/privacy" className="flex items-center gap-1.5 hover:text-ink">
            <ShieldIcon />
            {FOOTER_PRIVACY_LINK_LABEL}
          </Link>
        </div>
      </div>
    </footer>
  );
}
