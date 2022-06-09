import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';


@WebSocketGateway(3002, {cors: {
  origin: '*'
},
trnasport : ['websocket'] }) // TODO : config service for externalization config
export class VoiceGateway {
@WebSocketServer() public server : Server;
wsClients: Socket[] = [];

  afterInit(server : Server){
    server.on('connection', (socket: Socket) => {
      console.log('Client connected');
    });
  }
  
  @SubscribeMessage("voice")
  voice(@MessageBody() data: string, @ConnectedSocket() socket: Socket){
    var datanew = null;
    var newData = data.split(";")
    newData[0] = "data:audio/ogg;";
    datanew = newData[0] + newData[1]
    this.broadcast('send', datanew);
  }
  private broadcast(event, message: any) {
    const sendMessage:any = {
      event: event,
      datas: message
    }
    
    const broadCastMessage = JSON.stringify(sendMessage);
    for (let c of this.wsClients) {
      c.send(broadCastMessage);
    }
  }
  //연결 되었을때
  handleConnection(client:any): any {
    this.wsClients.push(client);
    console.log(this.wsClients.length);
  }  
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: Socket,client:any): any{
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect',{});
  }
}
