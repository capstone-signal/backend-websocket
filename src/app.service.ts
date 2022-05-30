import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {

  getHello(cookie: string): string {
    let accessToken = cookie["accessToken"];
    
  
    return 'Hello World!';
  }
}
