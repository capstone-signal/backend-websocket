import { Controller, Get, Req} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@Req() request: Request): string {

    let isUser = false;

    let cookie = request.cookies;
    // let accessToken = cookie.get("accessToken");
    // for(var i = 0; i < ids.length; i++){
    //   if(ids[i] == cookie)
    // }
    return this.appService.getHello(cookie);
  }


}
