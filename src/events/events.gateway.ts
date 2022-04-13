import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';
import { onlineMap } from './onlineMap';



@WebSocketGateway(parseInt(process.env.WEBSOCKET_PORT), {transports: ['websocket']}) // TODO : config service for externalization config
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() public server : Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data) {
    console.log(data);
    this.server.emit('ServerToClient', data);
  }

  afterInit(server: Server) {
    console.log('Websocketserver init');
    
  }
  //연결 되었을때
  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log('connected', socket.nsp.name);

    if(!onlineMap[socket.nsp.name]){
      onlineMap[socket.nsp.name] = {};
    }

    socket.emit('hello', socket.nsp.name);

  }
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: Socket): any{

    console.log('disconnected', socket.nsp.name);

    const newNameSpace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNameSpace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
      
  }
}
