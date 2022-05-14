import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';
const WebSocket = require('ws');
const yWebsocketUtils = require('y-websocket/bin/utils');

var socketsStatus= {};

@WebSocketGateway(80, {transports: ['websocket']}) // TODO : config service for externalization config
export class EventsGateway {
@WebSocketServer() public server : Server;

  afterInit(server: Server) {
    console.log('Websocketserver init');
    server.addListener('connection', yWebsocketUtils.setupWSConnection);
  }

  //연결 되었을때
  handleConnection(@ConnectedSocket() socket: WebSocket): any {
    // socket.send('connected');
  }  
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: Socket): any{
  }
}
