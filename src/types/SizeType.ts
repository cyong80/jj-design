import { typeArrayToObject } from "@/utils";

const typeArray = ["sm", "md", "lg"] as const;

export type SizeType = (typeof typeArray)[number];

export const SizeType = typeArrayToObject(typeArray);

export const SizeVariants: Record<SizeType, string> = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-4 py-3",
} as const;
