import {
  BarChart3,
  Blocks,
  Cable,
  CalendarClock,
  ClipboardCheck,
  Code2,
  Compass,
  Cpu,
  Database,
  Lightbulb,
  Network,
  Package,
  ScanSearch,
  TrendingUp,
  Truck,
  Workflow,
  Wrench,
  Brain,
  Briefcase,
  Clock,
  Factory,
  FileText,
  Gauge,
  Languages,
  LayoutDashboard,
  PenLine,
  Plug,
  RefreshCw,
  Server,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/catalog";

export const icons: Record<IconName, LucideIcon> = {
  factory: Factory,
  gauge: Gauge,
  languages: Languages,
  plug: Plug,
  refresh: RefreshCw,
  server: Server,
  layout: LayoutDashboard,
  brain: Brain,
  file: FileText,
  pen: PenLine,
  target: Target,
  briefcase: Briefcase,
  clock: Clock,
  shield: ShieldCheck,
  users: Users,
  chart: BarChart3,
  truck: Truck,
  trending: TrendingUp,
  scan: ScanSearch,
  wrench: Wrench,
  package: Package,
  database: Database,
  workflow: Workflow,
  lightbulb: Lightbulb,
  code: Code2,
  cable: Cable,
  clipboard: ClipboardCheck,
  cpu: Cpu,
  compass: Compass,
  blocks: Blocks,
  calendar: CalendarClock,
  network: Network,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = icons[name];
  return <C className={className} aria-hidden />;
}

/** LinkedIn glyph (brand icons were removed from lucide). */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.42 9.42zm8.02-17.44A11.26 11.26 0 0 0 12.04.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.66l6.06-1.59a11.3 11.3 0 0 0 5.36 1.37h.01c6.24 0 11.32-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  );
}
