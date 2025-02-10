# nodejs-express-socketio-nextjs-react-typescript-shadcnui

#### 2025 年的使用建議
- 新專案建議採用 ES Module：
由於 ES Module 為官方標準，提供靜態分析與 Tree-shaking 等優化特性，並且現代瀏覽器和最新版本的 Node.js 都有完善的支援，因此在新專案中使用 ES Module 能夠享有更佳的效能優化和更清晰的模組結構。

- 兼容性考量：
若專案中使用許多仍以 CommonJS 模組發佈的相依套件，則可能需要搭配一些轉譯設定或混用策略。不過隨著生態系統逐步轉向 ESM，這種情況會逐漸改善。

總結來看，2025 年對於新專案來說，採用 ES Module 為最佳選擇，能夠享有語法、效能和未來擴展性的多重優勢。如果需要與現有 CommonJS 模組共存，則可透過工具（例如 Babel 或相關轉換工具）做出適當的調整。

---

### Multiplayer Chat Room
整合 Next.js、React、TypeScript、Node.js、Express 與 socket.io，實作一個即時聊天室應用。此範例使用 Next.js 自訂 server（Custom Server）的方式，將 Express 與 socket.io 整合進來，並在 Next.js 的頁面中使用 socket.io-client 與伺服器互動。

### 專案結構
multiplayer-chat-room-app/
├── package.json
├── tsconfig.json
├── server.ts
└── pages/
    └── index.tsx

### package.json
因為 Next.js 會持續更新其產生的 .next 資料夾內的檔案（例如 pages-manifest.json），而 ts-node-dev 預設會監控整個專案的變更，因此一旦 .next 裡的檔案改變，就會觸發重啟，造成不斷循環的狀況。

- ##### 解決方法
> 在啟動指令中告訴 ts-node-dev 忽略監控 .next 資料夾內的檔案。你可以在 package.json 的 dev 指令中加入 --ignore-watch .next 選項

- ##### 額外建議
> 若未來發現還有其他自動產生或不需要監控的資料夾，也可以一併加入 --ignore-watch 參數

### tsconfig.json
> 因新專案建議使用 ES Module，但在開發時常常出現套件相容問題，所以改設定 "module": "CommonJS"

### server.ts
> 此自訂 server 會先初始化 Next.js，再建立 Express 應用，並以 httpServer 方式啟動。接著將 socket.io 附加在 httpServer 上，這樣既能處理 Next.js 頁面的請求，也能處理 socket.io 的連線。

### pages/index.tsx
> 此頁面使用 React Hook（useEffect 與 useState）來管理 socket.io 的連線與訊息列表。當元件掛載時建立連線，並監聽 'chat message' 事件；表單送出時會 emit 'chat message' 到 server，進而由 server 廣播給所有連線的 client。

---

#### [Troubleshooting]
如果遇到奇怪的錯誤，可嘗試以下幾點做法：
- 刪除 /node_modules，再重新執行 `npm install`
- 刪除 .next 資料夾後再啟動 `npm run dev`

#### [Change log]
v0.1.0 初始化環境

#### 專案執行
在專案根目錄執行：
- 安裝套件 `npm install`
- 執行開發環境 `npm run dev`