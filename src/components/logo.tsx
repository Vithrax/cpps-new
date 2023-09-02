import type { FC } from "react";
import { Unbounded } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Unbounded({ weight: "800", subsets: ["latin"] });

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <div
      className={cn(
        font.className,
        "text-2xl sm:text-4xl font-medium tracking-tight text-brand-main dark:text-white"
      )}
    >
      CPPS<span className="text-brand-secondary">.</span>
    </div>
  );
};

export default Logo;
