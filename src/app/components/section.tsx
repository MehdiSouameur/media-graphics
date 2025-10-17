import { twMerge } from "tailwind-merge";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function Section({ children, className = "", id, style }: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={twMerge("w-full py-20", className)}
    >
      {children}
    </section>
  );
}
