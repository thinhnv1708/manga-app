import { IRabbitmqConfig } from '@configurations/interfaces';

export const makeRabbitmqConfig = (
  config: IRabbitmqConfig,
): {
  protocol: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
}[] => {
  const { PROTOCOL, BROKERS, USERNAME, PASSWORD } = config;

  return BROKERS.map((broker) => {
    const [hostname, port] = broker.split(':');

    return {
      protocol: PROTOCOL,
      hostname,
      port: Number(port),
      username: USERNAME,
      password: PASSWORD,
    };
  });
};
