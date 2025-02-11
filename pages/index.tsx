import { useEffect, useState, FormEvent } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: typeof Socket;

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // 連線到同一個主機（預設連接到 window.location）
    socket = io();

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    // 當收到 'chat message' 事件時，將訊息新增到狀態中
    socket.on('chat message', (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // 清理：離開頁面時斷線
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 發送 'chat message' 事件到伺服器
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Next.js 與 socket.io 聊天室</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={input}
          placeholder="輸入訊息..."
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 12px', marginLeft: '8px' }}
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default Home;
