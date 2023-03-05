import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as moment from 'moment-timezone';

const env = process.env.NODE_ENV;

const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().tz(opts.tz).format();
  }
  return info;
});

const dailyOptions = {
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  dirname: __dirname + '/../../../logs',
  filename: `app.log.%DATE%`,
  maxFiles: 30, //30일치 로그파일 저장
  zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  colorize: false,
  handleExceptions: true,
  json: false,
};

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'silly' : 'silly',
      format:
        env === 'production'
          ? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
            winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('NestJS Project', {
                prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
              }),
            ),
      handleExceptions: true,
    }),

    // info, warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions),
  ],
  format: winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${info.level} [${process.pid}]: ${info.message}`;
    }),
  ),
});
