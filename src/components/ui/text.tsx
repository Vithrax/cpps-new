import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      quote: "mt-6 border-l-2 pl-6 italic",
    },
  },
});

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p";
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "p", className, children, ...props }, ref) => {
    const Comp = variant;
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Text.displayName = "Text";

export default Text;
