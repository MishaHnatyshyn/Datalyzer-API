import { Controller, Get, Request, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user) {
    console.dir(AuthGuard('local'));
    console.log(AuthGuard('jwt'));
    console.log(AuthGuard('g'));
    return this.authService.login(user);
  }
}
