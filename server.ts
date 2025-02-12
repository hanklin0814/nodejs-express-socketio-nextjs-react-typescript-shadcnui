import express from 'express';
import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // 使用 Node.js 內建的 http 模組建立伺服器
  const httpServer = createServer(app);

  // 初始化 socket.io 伺服器，並將其附加到 httpServer 上
  const io = new SocketIOServer(httpServer);

  // 當有 client 連線時
  io.on('connection', (socket) => {
    console.log('A client connected');

    // 廣播目前在線人數 (使用 io.sockets.sockets.size)
    io.emit('online count', io.sockets.sockets.size);

    //設定暱稱事件：存到 socket.data.nickname
    socket.on('set nickname', (nickname: string) => {
      socket.data.nickname = nickname;
      console.log(`Socket ${socket.id} set nickname to ${nickname}`);
    });

    // 接收客戶端送來的 'chat message' 事件
    socket.on('chat message', (msg: string) => {
      const nickname = socket.data.nickname || 'Anonymous';

      // 廣播訊息給所有連線的 client
      io.emit('chat message', { nickname, msg });
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
      io.emit('online count', io.sockets.sockets.size);
    });
  });

  // express 處理其他所有請求
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
