import { useControlled } from "@/hooks";
import { ShapeVariants, SizeVariants } from "@/types";
import { cn } from "@/utils";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { forwardRef, ReactNode, useCallback, useRef, useState } from "react";
import { SelectProvider } from "./Select.context";
import { SelectItem } from "./SelectItem";

const selectVariants = cva(
  "inline-flex items-center justify-between min-w-[180px] outline-none border border-default-200 focus:border-default-900 text-default-900",
  {
    variants: {
      shape: ShapeVariants,
      size: SizeVariants,
    },
    defaultVariants: {
      shape: "rounded",
      size: "md",
    },
  }
);

export interface ISelectProps extends VariantProps<typeof selectVariants> {
  defaultValue?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  options?: { label: ReactNode; value: string }[];
}

export const Select = forwardRef<HTMLDivElement, ISelectProps>(
  (
    {
      value: valueProp,
      onChange: onChangeProp,
      defaultValue,
      open: openProp,
      setOpen: setOpenProp,
      shape,
      size: sizeProp,
      placeholder = "Select",
      options,
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const isTypingRef = useRef(false);

    const [value, onChange] = useControlled({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onChangeProp,
    });

    const [open, setOpen] = useControlled({
      prop: openProp,
      defaultProp: false,
      onChange: setOpenProp,
    });

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: "bottom-start",
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip({
          padding: 10,
        }),
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
              minWidth: `${rects.reference.width}px`,
            });
          },
          padding: 10,
        }),
      ],
    });

    const handleSelect = useCallback((index: number | null) => {
      setSelectedIndex(index);
      setOpen(false);
      if (index !== null) {
        onChange(labelsRef.current[index]);
      }
    }, []);

    function handleTypeaheadMatch(index: number | null) {
      if (open) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    }

    const listNav = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: handleTypeaheadMatch,
      onTypingChange: (isTyping) => {
        isTypingRef.current = isTyping;
      },
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([listNav, typeahead, click, dismiss, role]);

    const mergeRef = useMergeRefs([refs.setReference, ref]);

    return (
      <SelectProvider
        open={open}
        setOpen={setOpen}
        value={value}
        onChange={onChange}
        activeIndex={activeIndex}
        selectedIndex={selectedIndex}
        getItemProps={getItemProps}
        handleSelect={handleSelect}
        isTyping={isTypingRef.current}
      >
        <div
          tabIndex={0}
          className={cn(selectVariants({ shape, size: sizeProp }))}
          ref={mergeRef}
          {...getReferenceProps()}
        >
          <span>
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <ChevronDown className={cn("size-[1em]")} />
        </div>
        <FloatingPortal>
          {open && options && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                className="overflow-hidden flex flex-col rounded-md bg-white border border-default-200 max-h-[300px] p-2 outline-none"
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </FloatingList>
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </SelectProvider>
    );
  }
);

Select.displayName = "Select";
