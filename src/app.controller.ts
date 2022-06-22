import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Logged in!' }; // TODO: return JWT access Token
  }

  //GET /protected
  // @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    // TODO: Require a bearer token, validate token
    return req.user;
  }
}
