import { ShapeVariants, SizeVariants } from "@/types";
import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { forwardRef } from "react";

const SelectItemPrimitive = SelectPrimitive.Item;

export const SelectItem = forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectItemPrimitive {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </SelectItemPrimitive>
  );
});

const selectVariants = cva(
  "inline-flex items-center justify-center bg-white outline-none border border-default-200",
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
}

export const Select = ({
  shape,
  size,
  defaultValue,
  placeholder = "Select a item…",
}: ISelectProps) => {
  return (
    <SelectPrimitive.Root defaultValue={defaultValue}>
      <SelectPrimitive.Trigger className={cn(selectVariants({ shape, size }))}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-violet11">
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-[5px]">
            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </SelectPrimitive.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="m-[5px] h-px bg-violet6" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Vegetables
              </SelectPrimitive.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="m-[5px] h-px bg-violet6" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Meat
              </SelectPrimitive.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
