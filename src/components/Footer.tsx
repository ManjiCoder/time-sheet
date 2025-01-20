import { LucideHome, LucideSettings } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <LucideHome />,
  },

  {
    name: 'Settings',
    href: '/settings',
    icon: <LucideSettings />,
  },
];
export default function Footer() {
  return (
    <footer className='flex space-x-5 justify-evenly items-center p-4'>
      {footerLinks.map(({ name, href, icon }) => (
        <Link
          key={href}
          href={href}
          className='grid place-items-center cursor-pointer'
        >
          {icon}
          {name}
        </Link>
      ))}
    </footer>
  );
}
