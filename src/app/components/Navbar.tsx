import Link from 'next/link'

export default function Navbar(): JSX.Element {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-600">RealState</span>
          </Link>
          <div>
            <Link href="/signin">
              <span className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 