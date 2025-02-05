import { typeArrayToObject } from "@/utils";

const typeArray = ["sm", "md", "lg"] as const;

export type SizeType = (typeof typeArray)[number];

export const SizeType = typeArrayToObject(typeArray);

export const SizeVariants: Record<SizeType, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
} as const;
