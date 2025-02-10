import { Dispatch, useCallback, useEffect, useRef, useState } from "react";

export interface IUseControllabledProps<T> {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
}

export const useControlled = <T,>({
  prop,
  defaultProp,
  onChange = () => {},
}: IUseControllabledProps<T>) => {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolled({
    defaultProp,
    onChange,
  });

  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue: Dispatch<React.SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as (prevState?: T) => T;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) onChange(value as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChange]
  );

  return [value, setValue] as const;
};

export const useUncontrolled = <T,>({
  defaultProp,
  onChange,
}: Omit<IUseControllabledProps<T>, "prop">) => {
  const uncontrolled = useState<T | undefined>(defaultProp);
  const [value] = uncontrolled;
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      onChange?.(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, onChange]);

  return uncontrolled;
};
