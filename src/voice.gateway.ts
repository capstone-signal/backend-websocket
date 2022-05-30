import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as ws from 'ws';

var socketsStatus= {};

@WebSocketGateway(8082, {cors: {
  origin: 'http://localhost:3000'
},
trnasport : ['websocket'] }) // TODO : config service for externalization config
export class VoiceGateway {
@WebSocketServer() public server : ws.Server;

  afterInit(server : ws.Server){
    server.on('connection', (socket: ws.Socket) => {
      console.log('Client connected');
    });
  }
    
  @SubscribeMessage("userInformation")
  userInformation(@MessageBody() data: string, @ConnectedSocket() client: ws.Socket){
    socketsStatus[client.id] = data;
    console.log(data)
    this.server.emit("usersUpdate", socketsStatus);
  }
  
  @SubscribeMessage("voice")
  voice(@MessageBody() data: string, @ConnectedSocket() socket: ws.WebSocket){

  
    var datanew = null;
    var newData = data.split(";")
    newData[0] = "data:audio/ogg;";
    datanew = newData[0] + newData[1]
    for (const id in socketsStatus) {
  
      if (id != socket.id && !socketsStatus[id].mute && socketsStatus[id].online)
        socket.broadcast.to(id).emit("send", datanew);
    }
  
  }
  //연결 되었을때
  handleConnection(@ConnectedSocket() socket: ws.Socket): any {
    socket.send('connected');
  }  
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: ws.Socket): any{
    delete socketsStatus[socket.id];
  }
}
