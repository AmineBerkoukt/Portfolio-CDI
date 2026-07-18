import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Pass-through wrapper — content is visible by default (no scroll-reveal gate). */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
