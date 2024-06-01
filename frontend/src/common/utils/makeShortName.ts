export const makeShortName = (name: string) => {
  const words = name.split(' ');
  return `${words[0]} ${words[1].slice(0, 1)}. ${words[2].slice(0, 1)}.`;
};
