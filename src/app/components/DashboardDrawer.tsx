'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  HomeIcon, 
  UsersIcon, 
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function DashboardDrawer({ isOpen, onClose }: DrawerProps) {
  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
    { name: 'Properties', icon: BuildingOfficeIcon, path: '/admin/properties' },
    { name: 'Users', icon: UsersIcon, path: '/admin/users' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/admin/analytics' },
    { name: 'Reports', icon: DocumentTextIcon, path: '/admin/reports' },
    { name: 'Notifications', icon: BellIcon, path: '/admin/notifications' },
    { name: 'Settings', icon: CogIcon, path: '/admin/settings' },
  ]

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 min-h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-0`}>
        {/* Header with Logo and Close Button */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">RealState ERP</h1>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
} 