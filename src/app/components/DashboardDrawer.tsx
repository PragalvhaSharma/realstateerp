'use client'

import { ReactNode } from 'react';

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardDrawer({ children, isOpen, onClose }: DrawerProps) {
  return (
    <div className="flex h-screen">
      {/* Add your drawer navigation content here */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 