import { useInteractions } from "@floating-ui/react";
import { createContext, useContext } from "react";

interface ISelectContext {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  value?: string | null;
  onChange?: (value: string | null) => void;

  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
  isTyping: boolean;
}

const SelectContext = createContext<ISelectContext>({
  open: false,
  setOpen: () => {},
  value: null,
  onChange: () => {},
  activeIndex: null,
  selectedIndex: null,
  getItemProps: () => ({}),
  handleSelect: () => {},
  isTyping: false,
});

interface ISelectProviderProps {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  value?: string | null;
  onChange?: (value: string | null) => void;
  children: React.ReactNode;

  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
  isTyping: boolean;
}

export const SelectProvider = ({
  open,
  setOpen,
  value,
  onChange,
  children,
  activeIndex,
  selectedIndex,
  getItemProps,
  handleSelect,
  isTyping,
}: ISelectProviderProps) => {
  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onChange,
        activeIndex,
        selectedIndex,
        getItemProps,
        handleSelect,
        isTyping,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
};
