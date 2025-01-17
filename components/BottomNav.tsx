'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Camera, Cog, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: Calculator, label: 'Home', href: '/' },
  { icon: Camera, label: 'Camera', href: '/camera' },
  { icon: Cog, label: 'Settings', href: '/settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className='sticky bottom-0 bg-gray-900 border-t border-gray-700'>
      <ul className='flex justify-around'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className='relative'>
              <Link
                href={item.href}
                className={`flex flex-col items-center pt-2 pb-1 text-xs ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                <item.icon size={24} />
                <span className='mt-1'>{item.label}</span>
              </Link>
              {isActive && (
                <motion.div
                  className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500'
                  layoutId='activeTab'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
