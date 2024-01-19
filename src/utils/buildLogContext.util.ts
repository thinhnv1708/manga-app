export const buildLogContext = (context: string, funcName?: string): string => {
  if (funcName) {
    return `${context}.${funcName}`;
  }

  return context;
};
