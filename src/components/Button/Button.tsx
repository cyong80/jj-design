import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

export const buttonVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      fill: "bg-gray-900 text-white",
      outline: "border border-gray-900 text-gray-900",
      ghost: "bg-transparent text-gray-900",
      link: "bg-transparent text-gray-900",
    },
    shape: {
      rounded: "rounded-md",
      square: "rounded-none",
      circle: "rounded-full",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    },
  },
  defaultVariants: {
    variant: "fill",
    size: "md",
    shape: "rounded",
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
