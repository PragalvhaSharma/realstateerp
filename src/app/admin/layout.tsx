'use client'

import { useState } from 'react'
import AdminDrawer from '@/app/components/AdminDrawer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  return (
    <AdminDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      {children}
    </AdminDrawer>
  )
} 