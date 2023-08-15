import { FC } from "react";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Lobster({ weight: "400", subsets: ["latin"] });

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <div
      className={cn(
        font.className,
        "text-4xl font-medium tracking-tighter text-brand-main dark:text-white"
      )}
    >
      CPPS<span className="text-brand-secondary">.</span>
    </div>
  );
};

export default Logo;
