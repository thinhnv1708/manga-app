export abstract class AbstractLoggerGwAdp {
  abstract log(message: string, context: string, level?: number): void;
  abstract debug(message: string, context: string, level?: number): void;
  abstract warn(message: string, context: string, level?: number): void;
  abstract error(message: string, context: string, level?: number): void;
}
