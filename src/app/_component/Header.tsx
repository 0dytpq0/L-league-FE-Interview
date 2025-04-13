import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  headerClassName?: string;
  titleClassName?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export default function Header({
  title,
  headerClassName,
  titleClassName,
  leftComponent,
  rightComponent,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between mx-5 py-5",
        headerClassName
      )}
    >
      <div className="flex items-center gap-5">
        {leftComponent}
        <span className={cn("font-bold text-xl", titleClassName)}>{title}</span>
      </div>
      {rightComponent && (
        <div className="flex items-center">{rightComponent}</div>
      )}
    </header>
  );
}
