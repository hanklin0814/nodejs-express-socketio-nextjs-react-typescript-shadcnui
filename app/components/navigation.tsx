'use client';

import Link from 'next/link';

type NavItem = {
  definition: string;
  partOfSpeech: string;
};

export default function Navigation({ items = [] }: { items: NavItem[] }) {
  // console.log({ items });
  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-6">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.partOfSpeech ?? '/'}>{item.definition}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
