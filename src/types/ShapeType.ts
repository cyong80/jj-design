import { typeArrayToObject } from "@/utils";

const typeArray = ["rounded", "square", "circle"] as const;

export type ShapeType = (typeof typeArray)[number];

export const ShapeType = typeArrayToObject(typeArray);

export const ShapeVariants: Record<ShapeType, string> = {
  rounded: "rounded-md",
  square: "rounded-none",
  circle: "rounded-full",
} as const;
