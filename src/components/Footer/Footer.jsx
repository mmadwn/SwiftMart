import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-8 mt-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg mb-4 font-h-bold">Resources</h3>
            <ul className="space-y-2 font-h-regular">
              <li><Link to="/blog" className="text-base text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/developers" className="text-base text-gray-600 hover:text-gray-900">Developers</Link></li>
              <li><Link to="/support" className="text-base text-gray-600 hover:text-gray-900">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg mb-4 font-h-bold">Help</h3>
            <ul className="space-y-2 font-h-regular">
              <li><Link to="/faq" className="text-base text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/shipping" className="text-base text-gray-600 hover:text-gray-900">Shipping</Link></li>
              <li><Link to="/returns" className="text-base text-gray-600 hover:text-gray-900">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg mb-4 font-h-bold">Company</h3>
            <ul className="space-y-2 font-h-regular">
              <li><Link to="/about" className="text-base text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/careers" className="text-base text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/contact" className="text-base text-gray-600 hover:text-gray-900">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg mb-4 font-h-bold">Stay Connected</h3>
            <ul className="space-y-2 font-h-regular">
              <li><a href="#" className="text-base text-gray-600 hover:text-gray-900">Facebook</a></li>
              <li><a href="#" className="text-base text-gray-600 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="text-base text-gray-600 hover:text-gray-900">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center font-h-regular">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">© {currentYear} SwiftMart. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Terms of Use</Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Privacy Policy</Link>
            <Link to="/sales-terms" className="text-sm text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Terms of Sale</Link>
            <Link to="/guides" className="text-sm text-gray-600 hover:text-gray-900 mb-2 md:mb-0">Guides</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer