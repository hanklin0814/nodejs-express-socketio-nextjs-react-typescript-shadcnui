'use client';

import { useEffect, useState, FormEvent } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: typeof Socket;

const ChatPage = () => {
  // 使用者暱稱相關狀態
  const [nickname, setNickname] = useState('');
  const [nicknameSet, setNicknameSet] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');

  // 聊天訊息與輸入
  const [messages, setMessages] = useState<
    Array<{ nickname: string; message: string }>
  >([]);
  const [input, setInput] = useState('');

  // 在線人數
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    // 連線到同一個主機（預設連接到 window.location）
    socket = io();

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    // 接收廣播的聊天訊息
    socket.on('chat message', (data: { nickname: string; msg: string }) => {
      setMessages((prev) => [
        ...prev,
        { nickname: data.nickname, message: data.msg },
      ]);
    });

    // 接收在線人數更新
    socket.on('online count', (count: number) => {
      setOnlineCount(count);
    });

    // 清理：離開頁面時斷線
    return () => {
      socket.disconnect();
    };
  }, []);

  // 處理暱稱設定
  const handleNicknameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nicknameInput.trim()) {
      socket.emit('set nickname', nicknameInput);
      setNickname(nicknameInput);
      setNicknameSet(true);
    }
  };

  // 處理聊天訊息送出
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h3 className="text-xl">多人聊天室</h3>
          <div className="mt-2 sm:mt-0 text-sm text-gray-500">
            在線人數：{onlineCount}
          </div>
        </div>
        <div>
          {/* 若尚未設定暱稱，顯示暱稱設定區 */}
          {!nicknameSet && (
            <form
              onSubmit={handleNicknameSubmit}
              className="mb-4 flex space-x-2"
            >
              <input
                type="text"
                placeholder="請輸入暱稱"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
              />
              <button type="submit">設定暱稱</button>
            </form>
          )}
          {/* 聊天訊息區 */}
          <div className="h-64 overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg.nickname}:</strong> {msg.message}
              </div>
            ))}
          </div>
          {/* 聊天訊息輸入區 */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="輸入訊息..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">送出</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
