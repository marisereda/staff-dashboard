export const getInitials = (s: string): string => {
  return s
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('.')
    .toUpperCase();
};
