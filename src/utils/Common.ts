const short = (addr?: string) => {
  if (!addr) return null;

  return `${addr.slice(0, 5)}…${addr.slice(-4)}`;
};

export { short };
