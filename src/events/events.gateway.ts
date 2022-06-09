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

const SYNC_PERIOD = 20;
const WSS_PORT = 3001;
@WebSocketGateway(WSS_PORT, {transports: ['websocket']}) // TODO : config service for externalization config
export class EventsGateway {
  wsClients= [];
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
      try {
        if(!req.url.startsWith('/socket/')) {
          return
        }
        const { reservationId, reviewDiffId } = this.eventsService.parseUrl(req.url.split('/socket/')[1]);

        const reservation = await this.reservationService.findById(reservationId);
        if(!reservation) {
          this.handleCloseConnection(conn, "reservation not found");
        }

        const cookies = req.headers.cookie.split(';');
        const accessToken = cookies.find(cookie => cookie.split('=')[0].trim() === 'accessToken').split('=')[1];
        if(!accessToken) {
          this.handleCloseConnection(conn, "accessToken not found");
        }

        const userId = this.authService.validateToken(accessToken);
        if(!userId || userId != reservation.reviewer.id && userId != reservation.discussion.user.id) {
          this.handleCloseConnection(conn, "Invalid userId");
        }

        if(!this.reservationService.isProcessing(reservation)) {
          this.handleCloseConnection(conn, "reservation is not processing");
        }

        const docName = req.url.split('/socket/')[1];

        // init phase
        const ydoc = yWebsocketUtils.getYDoc(docName);
        const text = ydoc.getText(docName) as Y.Text;
        const reviewDiff = await this.reviewService.getReviewDiff(reviewDiffId);
        if(this.isNotInitialized(text)) {
          console.log(reviewDiff.codeAfter);
          text.insert(0, reviewDiff.codeAfter, {});
        }
        yWebsocketUtils.setupWSConnection(conn, req, { docName, gc: true });
        conn.addEventListener('message', async (event) => {
          if(!this.reservationService.isProcessing(reservation)) {
            await this.reviewService.complete(reservation);
            this.handleCloseConnection(conn, 'review is completed', 3999);
          }
          const now = new Date().getTime();
          if(now % SYNC_PERIOD === 0) { // 2. 랜덤하게 데이터 동기화 시켜주기 TODO NoSQL로 성능개선
            await this.reviewService.updateReviewDiff(reviewDiff, text.toString());
          }
        })
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
  handleConnection(client: any, @ConnectedSocket() socket: WebSocket): any {
    this.wsClients.push(client);
  }  
  //연결 끊겼을때
  handleDisconnect(@ConnectedSocket() socket: Socket): any{
  }


  handleCloseConnection(connection: WebSocket, message?: string, code?: number): any {
    console.log("close connection", message);
    connection.close(code ?? 1000, message);
  }
}
