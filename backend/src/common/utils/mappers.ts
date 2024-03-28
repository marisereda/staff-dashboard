export const convertBigIntToInt = <T extends Record<string, unknown>>(obj: T): T => {
  const convertedEntries = Object.entries(obj).map(([key, value]) =>
    typeof value === 'bigint' ? [key, Number(value)] : [key, value]
  );

  return Object.fromEntries(convertedEntries);
};
