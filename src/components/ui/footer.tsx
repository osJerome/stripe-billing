import * as React from "react";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content?: string;
  year?: number;
}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  (
    {
      className,
      title,
      content = "All rights reserved.",
      year = new Date().getFullYear(),
      ...props
    },
    ref
  ) => (
    <footer
      ref={ref}
      className={cn(
        "bg-white text-secondary-foreground pt-10 pb-5 font-semibold shadow-sm",
        className
      )}
      {...props}
    >
      <div className="container mx-auto text-center text-green-600">
        {`${title} © ${year} ${content}`}
      </div>
    </footer>
  )
);
Footer.displayName = "Footer";

export { Footer };
