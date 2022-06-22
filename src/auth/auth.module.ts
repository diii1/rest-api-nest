import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
// import { SessionSerializer } from './session.serializer';

@Module({
  // imports: [UsersModule, PassportModule.register({ session: true })],
  imports: [UsersModule, PassportModule],
  // providers: [AuthService, LocalStrategy, SessionSerializer],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
