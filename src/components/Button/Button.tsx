import { ShapeVariants, SizeVariants } from "@/types";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        fill: "text-default-100 disabled:bg-default-200 disabled:text-default-400",
        outline: "border disabled:border-default-200 disabled:text-default-400",
        ghost: "disabled:text-default-400",
        link: "hover:not-disabled:underline decoration-2 underline-offset-2",
      },
      shape: ShapeVariants,
      size: SizeVariants,
      color: {
        default: "",
        danger: "",
        success: "",
        warning: "",
        info: "",
      },
    },
    compoundVariants: [
      {
        variant: "fill",
        color: "default",
        className: "bg-default-800 hover:not-disabled:bg-default-700",
      },
      {
        variant: "fill",
        color: "danger",
        className: "bg-danger-500 hover:not-disabled:bg-danger-600",
      },
      {
        variant: "fill",
        color: "success",
        className: "bg-success-500 hover:not-disabled:bg-success-600",
      },
      {
        variant: "fill",
        color: "warning",
        className: "bg-warning-500 hover:not-disabled:bg-warning-600",
      },
      {
        variant: "fill",
        color: "info",
        className: "bg-info-500 hover:not-disabled:bg-info-600",
      },
      {
        variant: "outline",
        color: "default",
        className:
          "border-default-900 text-default-900 hover:not-disabled:bg-default-100",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-danger-500 text-danger-500 hover:not-disabled:bg-danger-100",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-success-500 text-success-500 hover:not-disabled:bg-success-100",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-warning-500 text-warning-500 hover:not-disabled:bg-warning-100",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "border-info-500 text-info-500 hover:not-disabled:bg-info-100",
      },
      {
        variant: "ghost",
        color: "default",
        className: "text-default-900 hover:not-disabled:bg-default-100",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "text-danger-500 hover:not-disabled:bg-danger-100",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-success-500 hover:not-disabled:bg-success-100",
      },
      {
        variant: "ghost",
        color: "warning",
        className: "text-warning-500 hover:not-disabled:bg-warning-100",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-info-500 hover:not-disabled:bg-info-100",
      },
      {
        variant: "link",
        color: "default",
        className: "text-default-900 decoration-default-900",
      },
      {
        variant: "link",
        color: "danger",
        className: "text-danger-500 decoration-danger-500",
      },
      {
        variant: "link",
        color: "success",
        className: "text-success-500 decoration-success-500",
      },
      {
        variant: "link",
        color: "info",
        className: "text-info-500 decoration-info-500",
      },
    ],
    defaultVariants: {
      variant: "fill",
      size: "md",
      shape: "rounded",
      color: "default",
    },
  }
);

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, shape, color, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            shape,
            color,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
