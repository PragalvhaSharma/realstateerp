import Link from 'next/link'
import Image from 'next/image'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
              Find Your Perfect <span className="text-blue-600">Student Home</span>
            </h1>
            <p className="text-xl text-gray-600">
              Connect with trusted realtors and discover your ideal living space. 
              Verified properties, seamless connections, and a modern platform designed for students.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/login/student">
                <span className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors duration-200 text-lg font-semibold">
                  Start as Student
                </span>
              </Link>
              <Link href="/login/realtor">
                <span className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 
                rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg font-semibold">
                  Join as Realtor
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <Image
                src="/hero-image.jpg"
                alt="Modern apartment interior"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg 
                border border-gray-100">
                <p className="text-2xl font-bold text-blue-600">2000+</p>
                <p className="text-gray-600">Available Properties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Students Choose <span className="text-blue-600">RealState</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md 
                transition-shadow duration-200 border border-gray-100"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center 
            text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your New Home?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students who have already found their perfect living space 
              through our platform.
            </p>
            <Link href="/signup">
              <span className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 
                transition-colors duration-200 text-lg font-semibold inline-block shadow-sm">
                Get Started Now
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const features = [
  {
    icon: '🏠',
    title: 'Verified Properties',
    description: 'All listings are thoroughly verified to ensure quality and safety standards for students.'
  },
  {
    icon: '🤝',
    title: 'Direct Connections',
    description: 'Connect directly with verified realtors who understand student housing needs.'
  },
  {
    icon: '📱',
    title: 'Smart Platform',
    description: 'User-friendly interface with powerful search filters and virtual tours.'
  }
]