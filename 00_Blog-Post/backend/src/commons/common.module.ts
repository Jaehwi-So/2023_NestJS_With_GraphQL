import { Logger, Module } from '@nestjs/common';
import { JwtRefreshStretagy } from './auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from './auth/jwt-access.strategy';
import { JwtGoogleStrategy } from './auth/jwt-oauth-google.strategy';
import { RequestMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  providers: [JwtRefreshStretagy, JwtAccessStrategy, JwtGoogleStrategy, Logger],
  exports: [JwtRefreshStretagy, JwtAccessStrategy, JwtGoogleStrategy, Logger],
})
export class CommonModule {}
