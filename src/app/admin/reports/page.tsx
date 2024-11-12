'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { mockProperties } from '@/app/utils/mockData'
import { PubSub } from 'jspdf'

// Add proper type for the internal jsPDF object
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: { finalY: number }
  }
}

export default function ReportsPage() {
  const router = useRouter()
  const isGeneratingRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing report...')
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const generateAndDownloadPDF = async () => {
    if (isGeneratingRef.current) return
    isGeneratingRef.current = true

    try {
      setProgress(10)
      setStatus('Creating document...')
      const doc = new jsPDF()
      const data = mockProperties

      // Add company branding with improved styling
      setProgress(20)
      setStatus('Adding branding...')
      doc.setFillColor(41, 128, 185)
      doc.rect(0, 0, doc.internal.pageSize.width, 45, 'F')
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(28)
      doc.text('RealState ERP', 14, 30)
      
      // Add report title and metadata with better spacing
      setProgress(35)
      setStatus('Adding report information...')
      doc.setFontSize(22)
      doc.setTextColor(51, 51, 51)
      doc.text('Property Inventory Report', 14, 65)
      
      doc.setFontSize(10)
      doc.setTextColor(119, 119, 119)
      const reportId = Math.random().toString(36).substr(2, 9).toUpperCase()
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 75)
      doc.text(`Report ID: ${reportId}`, 14, 80)

      // Add table with improved styling
      setProgress(60)
      setStatus('Generating property table...')
      autoTable(doc, {
        head: [['Property', 'Address', 'Price', 'Status', 'Listed Date']],
        body: data.map(row => [
          row.property,
          row.address,
          formatCurrency(row.price),
          row.status,
          row.createdAt.toLocaleDateString()
        ]),
        startY: 90,
        styles: { 
          fontSize: 10,
          cellPadding: 6,
          lineColor: [200, 200, 200],
          lineWidth: 0.1,
        },
        headStyles: { 
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { halign: 'right', cellWidth: 30 },
          3: { halign: 'center', cellWidth: 25 },
          4: { halign: 'center', cellWidth: 25 }
        }
      })

      // Add summary statistics with improved layout
      setProgress(80)
      setStatus('Calculating statistics...')
      const finalY = doc.lastAutoTable.finalY || 90
      const totalValue = data.reduce((sum, prop) => sum + prop.price, 0)
      const availableProperties = data.filter(p => p.status === 'Available').length
      
      doc.setFillColor(245, 247, 250)
      doc.rect(10, finalY + 15, doc.internal.pageSize.width - 20, 45, 'F')
      
      doc.setFontSize(14)
      doc.setTextColor(41, 128, 185)
      doc.text('Summary Statistics', 14, finalY + 30)
      
      doc.setFontSize(10)
      doc.setTextColor(51, 51, 51)
      const stats = [
        `Total Properties: ${data.length}`,
        `Available Properties: ${availableProperties}`,
        `Total Portfolio Value: ${formatCurrency(totalValue)}`,
        `Average Property Price: ${formatCurrency(totalValue / data.length)}`
      ]
      doc.text(stats, 14, finalY + 40)

      // Add footer with page numbers
      const pageCount = doc.internal.pages.length - 1
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
      }

      setProgress(90)
      setStatus('Finalizing document...')
      
      const timestamp = new Date().toISOString().split('.')[0].replace(/[:]/g, '-')
      doc.save(`real-estate-report-${timestamp}.pdf`)
      
      setProgress(100)
      setStatus('Download complete!')
      
      // Clean redirect after successful generation
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error generating PDF:', error)
      setError('An error occurred while generating the report')
      setStatus('Error generating report')
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/admin/dashboard')
    } finally {
      isGeneratingRef.current = false
    }

  }

  useEffect(() => {
    generateAndDownloadPDF()
    return () => {
      isGeneratingRef.current = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="relative h-24 w-24 mx-auto mb-6">
            <div className="absolute inset-0">
              <svg className="circular-progress" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={error ? '#ef4444' : '#3b82f6'}
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-semibold ${error ? 'text-red-600' : 'text-blue-600'}`}>
                {progress}%
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {error ? 'Error' : 'Generating Report'}
          </h2>
          <p className={`mb-4 ${error ? 'text-red-600' : 'text-gray-600'}`}>
            {error || status}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                error ? 'bg-red-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {error ? 'Redirecting to dashboard...' : 'Please don\'t close this window'}
          </p>
        </div>
      </div>
    </div>
  )
} 