'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon,
  BellIcon,
  XMarkIcon,
  Bars3Icon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function AdminDrawer({ isOpen, onClose, children }: DrawerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/admin/users' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/admin/analytics' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? 'bg-opacity-50 z-40' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed lg:static h-screen bg-white shadow-lg 
          transform transition-all duration-300 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header with improved transitions */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Bars3Icon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            {!isCollapsed && (
              <button 
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full ml-2 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items with improved transitions */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                    hover:bg-blue-50 text-gray-700 hover:text-blue-600
                    ${!isCollapsed ? 'space-x-3' : 'justify-center'}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <item.icon className={`w-6 h-6 transition-transform duration-300 ${
                    isCollapsed ? 'transform scale-110' : ''
                  }`} />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {children}
      </div>
    </div>
  )
} 