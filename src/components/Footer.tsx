'use client';

export default function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}