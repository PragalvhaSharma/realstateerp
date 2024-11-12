export default function Footer(): JSX.Element {
  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: 'fab fa-facebook' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'fab fa-twitter' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'fab fa-linkedin' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">RealState</h3>
            <p className="text-gray-300">Finding perfect homes for students.</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/properties" className="text-gray-300 hover:text-white transition-colors">Properties</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                support@realstate.com
              </p>
              <p className="text-gray-300 flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </p>
              <p className="text-gray-300 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                123 Student Housing St.<br />
                University District, ST 12345
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} RealState. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 