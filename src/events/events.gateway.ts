import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
//import { WebSocket } from 'ws';
import { Server , Socket} from 'socket.io';
import { onlineMap } from './onlineMap';
const WebSocket = require('ws');
const yWebsocketUtils = require('y-websocket/bin/utils');

@WebSocketGateway(parseInt(process.env.WEBSOCKET_PORT), {transports: ['websocket']}) // TODO : config service for externalization config
export class EventsGateway {
  @WebSocketServer() public server : Server;

  afterInit(server: Server) {
    console.log('Websocketserver init');
    server.addListener('connection', yWebsocketUtils.setupWSConnection);
  }

  //연결 되었을때
  handleConnection(@ConnectedSocket() socket: WebSocket): any {
    //socket.send('connected');
  }  
  //연결 끊겼을때

  handleDisconnect(@ConnectedSocket() socket: Socket): any{
    console.log('disconnected');
  }
}
