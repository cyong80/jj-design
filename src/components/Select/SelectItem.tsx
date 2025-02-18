import { cn } from "@/utils";
import { useListItem } from "@floating-ui/react";
import { Check } from "lucide-react";
import { ReactNode } from "react";
import { useSelectContext } from "./Select.context";

interface ISelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem = ({ value, children }: ISelectItemProps) => {
  const { activeIndex, selectedIndex, getItemProps, handleSelect, isTyping } =
    useSelectContext();

  const { ref, index } = useListItem({ label: value });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        "flex items-center text-sm px-2 py-1 rounded-sm cursor-default outline-none",
        {
          "bg-default-100": isActive,
        }
      )}
      {...getItemProps({
        onClick: () => handleSelect(index),
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSelect(index);
          }

          if (e.key === " " && !isTyping) {
            e.preventDefault();
            handleSelect(index);
          }
        },
      })}
    >
      <div className="flex items-center justify-center w-6">
        {isSelected && <Check className="size-[1em]" />}
      </div>
      {children}
    </div>
  );
};
