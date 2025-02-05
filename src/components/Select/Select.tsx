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

export const Select = () => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger>
        <SelectPrimitive.Value placeholder="Select a fruit…" />
        <SelectPrimitive.Icon>
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton>
            <ChevronUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>
            <SelectPrimitive.Group>
              <SelectPrimitive.Label>Fruits</SelectPrimitive.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label>Vegetables</SelectPrimitive.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label>Meat</SelectPrimitive.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <ChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
