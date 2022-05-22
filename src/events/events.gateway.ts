import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Request } from 'express';
import { Server , Socket} from 'socket.io';
import { AuthService } from 'src/service/auth/auth.service';
import { ReservationService } from 'src/service/reservation/reservation.service';
import { ReviewService } from 'src/service/review/review.service';
import { EventsService } from './events.service';
import Y from 'yjs';
const WebSocket = require('ws');
const yWebsocketUtils = require('y-websocket/bin/utils');

@WebSocketGateway(1235, {transports: ['websocket']}) // TODO : config service for externalization config
export class EventsGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly reservationService: ReservationService,
    private readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly reviewService: ReviewService
  ) {}

  @WebSocketServer() public server : Server;

  afterInit(server: Server) {
    server.addListener('connection', async (conn: WebSocket, req: Request) => {
      // authentciation based on req.headers.cookie, review id -> is user is reviewer or reviewee
      try {
        const { reservationId, reviewDiffId } = this.eventsService.parseUrl(req.url.split('/')[1]);

        const reservation = await this.reservationService.findById(reservationId);
        if(!reservation) {
          throw new Error('Reservation not found');
        }

        const cookies = req.headers.cookie.split(';');
        const accessToken = cookies.find(cookie => cookie.split('=')[0].trim() === 'accessToken').split('=')[1];
        if(!accessToken) {
          throw new Error('Access token not found');
        }

        const userId = this.authService.validateToken(accessToken);
        if(!userId || userId != reservation.reviewer.id && userId != reservation.discussion.user.id) {
          throw new Error('Invalid user');
        }

        if(!this.reservationService.isProcessing(reservation)) {
         // throw new Error('Reservation is not processing');
        }

        const docName = req.url.split('/')[1];

        // init phase
        const ydoc = yWebsocketUtils.getYDoc(docName);
        const text = ydoc.getText(docName) as Y.Text;
        if(this.isNotInitialized(text)) {
          const { codeAfter } = await this.reviewService.getReviewDiff(reviewDiffId);
          text.insert(0, codeAfter, {});
        }
        console.log(text.toString())
       
        yWebsocketUtils.setupWSConnection(conn, req, { docName, gc: true });
        // shutdown phase
        // conn.addEventListener('message', (event) => {
        //   if(!this.reservationService.isProcessing(reservation)) {
        //     this.handleCloseConnection(conn);
        //   }
        // })
      } catch (e) {
        console.error(e);
        conn.close();
      }
    });
  }

// check initializing TODO 다른 방법 찾아보기
  private isNotInitialized(text: any) {
    return text.toString() === '';
  }

  //연결 되었을때
  handleConnection(@ConnectedSocket() socket: WebSocket): any {
    // socket.send('connected');
  }  
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: Socket): any{
  }

  handleCloseConnection(connection: WebSocket): any {
    connection.close(1000);
  }
}
