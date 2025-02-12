import { ReactNode } from 'react';
import Navigation from './components/navigation';
import Sidebar from './components/sidebar';
import { ProgressBar } from './components/progress-bar';

type Config = {
  // theme: 'dark' | 'light';
  // navigation: { label: string; link: string }[];
  // showSidebar: boolean;

  word: string;
  definitions: {
    definition: string;
    partOfSpeech: string;
  }[];
};

async function getConfig(): Promise<Config> {
  // 假設 API URL 為 /api/config，也可替換為外部 API
  const res = await fetch(
    'https://www.wordsapi.com/mashape/words/fast/definitions?when=2025-02-11T08:00:06.462Z&encrypted=8cfdb18fe722919beb9007bfe758beb9aeb02b0934f995b8',
    {
      // 可設定快取或 revalidate 時間，例如 60 秒更新一次
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    // 若 API 呼叫失敗，提供預設值
    return {
      word: 'string',
      definitions: [
        {
          definition: 'string',
          partOfSpeech: 'string',
        },
      ],
    };
  }

  const data = await res.json();
  // console.log('Fetched data:', data);

  return data;
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const config = await getConfig();

  // 根據主題設定 html 的 class，可搭配 CSS 或 Tailwind CSS 使用
  const themeClass = config.word === '111' ? 'test1' : 'test2';

  return (
    <html lang="zh" className={themeClass}>
      <head>
        <title>前台網站</title>
        {/* 可加入 meta 與其他 head 內容 */}
      </head>
      <body>
        {/* 頁首導覽列 */}
        <header>
          <Navigation items={config.definitions} />
        </header>
        {/* 主體區域：依據設定顯示側邊欄 */}
        <div className="main-container flex">
          {config.word && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}
          <ProgressBar />
          {children}
        </div>
      </body>
    </html>
  );
}
