'use client';

import Link from 'next/link';

type NavItem = {
  label: string;
  link: string;
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h3 className="font-bold mb-2">側邊欄</h3>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        <li>
          <Link href={`/chat`}>Chat Room</Link>
        </li>
      </ul>
    </aside>
  );
}
