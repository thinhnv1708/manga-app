export const getIp = (ipString: string) => {
  const ipv4Regex =
    /((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])/g;
  const ipv6Regex = /((([0-9a-fA-F]){1,4}):){7}([0-9a-fA-F]){1,4}/g;

  // Get ipv4
  const [ipv4] = String(ipString).match(ipv4Regex) || [];

  // Get ipv6
  const [ipv6] = String(ipString).match(ipv6Regex) || [];

  return {
    ipv4,
    ipv6,
  };
};
