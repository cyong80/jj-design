export const typeArrayToObject = <T extends string>(
  typeArray: readonly T[]
) => {
  return typeArray.reduce(
    (a, v) => ({ ...a, [v]: v }),
    {} as { [key in T]: key }
  );
};
