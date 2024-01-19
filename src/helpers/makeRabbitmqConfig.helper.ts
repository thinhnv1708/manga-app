import { IRabbitmqConfig } from '@configurations/interfaces';

export const makeRabbitmqConfig = (
  config: IRabbitmqConfig,
): {
  protocol: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}[] => {
  const { PROTOCOL, BROKERS, USERNAME, PASSWORD, VHOST } = config;

  return BROKERS.map((broker) => {
    const [hostname, port] = broker.split(':');

    return {
      protocol: PROTOCOL,
      hostname,
      port: Number(port),
      username: USERNAME,
      password: PASSWORD,
      vhost: VHOST,
    };
  });
};
