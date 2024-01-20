export const diffHrtimeMS = (
  startHrt: [number, number],
  toFixedDigits: number = 1,
  endHrt: [number, number] = process.hrtime(),
) => {
  const ms = (endHrt[0] - startHrt[0]) * 1e3 + (endHrt[1] - startHrt[1]) * 1e-6;

  return toFixedDigits ? ms.toFixed(toFixedDigits) : ms;
};
