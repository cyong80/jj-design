import { useControlled } from "@/hooks";
import type { Placement } from "@floating-ui/react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import * as React from "react";
import { useRef } from "react";

export interface TooltipProps {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  content: React.ReactNode;
}
export function Tooltip({
  children,
  content,
  initialOpen = false,
  placement = "top",
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: TooltipProps) {
  const [open, onOpenChange] = useControlled({
    prop: openProp,
    onChange: onOpenChangeProp,
    defaultProp: initialOpen,
  });

  const arrowRef = useRef(null);

  const { context, refs, floatingStyles } = useFloating({
    placement,
    open,
    onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: ({ side }) => {
      if (side === "top") {
        return {
          opacity: 0,
          translate: "0 10px",
        };
      }
      if (side === "bottom") {
        return {
          opacity: 0,
          translate: "0 -10px",
        };
      }

      if (side === "left") {
        return {
          opacity: 0,
          translate: "10px 0",
        };
      }

      if (side === "right") {
        return {
          opacity: 0,
          translate: "-10px 0",
        };
      }

      return { opacity: 0 };
    },
    open: {
      opacity: 1,
      translate: "0 0",
    },
    close: { opacity: 0 },
    duration: 100,
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 200, close: 200 },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        data-state={context.open ? "open" : "closed"}
        {...getReferenceProps()}
      >
        {children}
      </div>

      <FloatingPortal>
        {open && isMounted && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div
              className="bg-default-900 text-default-50 rounded-md p-2 text-sm"
              style={styles}
            >
              {content}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
