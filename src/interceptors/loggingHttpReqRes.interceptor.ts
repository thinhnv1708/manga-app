import { ILoggerConfig } from '@configurations/interfaces';
import { AbstractLoggerGwAdp } from '@modules/logger';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { diffHrtimeMS, getIp, truncateString } from '@utils/index';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const REQ_CONTEXT_LOG = 'HttpRequest';
const RES_CONTEXT_LOG = 'HttpResponse';

@Injectable()
export class LoggingHttpReqResInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerGwAdp: AbstractLoggerGwAdp,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { TRUNCATE } = this.configService.get<ILoggerConfig>('LOGGER_CONFIG');
    const reqId = Date.now() + Math.floor(Math.random() * 1000);

    const ctx = context.switchToHttp();

    const req = ctx.getRequest<Request>();

    const rawIp = getIp(req.headers['x-forwarded-for']?.toString() || req.ip);

    const clientIp = rawIp.ipv4 || rawIp.ipv6 || 'localhost';

    const reqQuery = truncateString(
      JSON.stringify(req.query),
      TRUNCATE.REQUEST,
    );

    const reqBody = truncateString(JSON.stringify(req.body), TRUNCATE.REQUEST);

    const startTime = process.hrtime();

    this.loggerGwAdp.debug(
      `[ReqId: ${reqId}]-[IP: ${clientIp}]-[Method: ${req.method}]-[Path:${req.originalUrl}]-[Query: ${reqQuery}]-[Body: ${reqBody}]`,
      REQ_CONTEXT_LOG,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          data.serverTime = Date.now();

          const resBody = truncateString(
            JSON.stringify(data),
            TRUNCATE.RESPONSE,
          );

          const responseTime = diffHrtimeMS(startTime);

          this.loggerGwAdp.debug(
            `[ReqId: ${reqId}]-[IP: ${clientIp}]-[ResBody: ${resBody}]-[ResTime: ${responseTime}ms]`,
            RES_CONTEXT_LOG,
          );
        },
      }),
    );
  }
}
