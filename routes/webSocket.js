const   wsModule = require("ws");

module.exports = function(_sever)
{
    //웹소켓 서버 생성
    const wss = new wsModule.Server( {server : _sever} );

    //클라이언트가 접속했을 때 처리하는 이벤트 메소드 연결
    wss.on( 'connection', function(ws, req){

        //사용자 ip 파악
        let ip = req.headers[ 'x-forwards-for' ] || req.connection.remoteAddress;
        console.log( ip + "아이피의 클라이언트로 부터 접속 요청이 있었습니다." );

        //메세지를 받았을 때 호출되는 이벤트 메소드
        ws.on('message', function( message ){

            // 받은 메세지 출력
            console.log( ip + "로부터 받은 메세지 : " +message)
            // 클라이언트에 받은 메세지를 그대로 보내, 통신이 잘되는지 확인
            ws.send( "echo:" + message); 
        });

        //오류가 발생했을 때 호출되는 이벤트
        ws.on('error', function(error){
            console.log(ip + "클라이언트와 연결중 오류 발생:" + error);
        });

        //접속 종료되면 호출되는 이벤트 메소드
        ws.on('close', function(){
            console.log(ip + "클라이언트와 접속이 끊어 졌습니다.");
        });
    });
}