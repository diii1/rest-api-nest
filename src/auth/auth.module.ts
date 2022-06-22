import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
// import { SessionSerializer } from './session.serializer';

@Module({
  // imports: [UsersModule, PassportModule.register({ session: true })],
  // providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '60s' } }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
