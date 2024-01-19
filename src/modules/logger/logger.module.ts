import { Global, Module } from '@nestjs/common';
import { AbstractLoggerGwAdp } from './abstracts/logger.gw.adp.abstract';
import { ConsoleLoggerGwAdp } from './consoleLogger.gw.adp';

@Global()
@Module({
  providers: [{ provide: AbstractLoggerGwAdp, useClass: ConsoleLoggerGwAdp }],
  exports: [AbstractLoggerGwAdp],
})
export class LoggerModule {}
