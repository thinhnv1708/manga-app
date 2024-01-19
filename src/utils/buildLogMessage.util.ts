export const buildLogMessage = (
  message: string,
  params: string = '',
  result: string = '',
  stack: string = '',
): string => {
  const args = [
    { label: 'Message', value: message },
    { label: 'Params', value: params },
    { label: 'Result', value: result },
    { label: 'Stack', value: stack },
  ];

  return args.reduce((previousValue: string, currentValue) => {
    if (currentValue.value) {
      return `${previousValue}-[${currentValue.label}: ${currentValue.value}]`;
    } else {
      return previousValue;
    }
  }, '');
};
