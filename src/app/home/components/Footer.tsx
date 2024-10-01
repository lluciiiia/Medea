// src/components/Footer.tsx
import Link from 'next/link'
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi'
import React from 'react'

interface FooterColumnProps {
  title: string
  links: string[]
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link href="#" className="text-gray-600 hover:text-gray-900">{link}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Footer: React.FC = () => (
  <footer className="bg-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <FooterColumn title="Home" links={['New Project', 'Select Category', 'Project Details', 'Generate Template', 'Project Management']} />
        <FooterColumn title="About Us" links={['Media Production', 'Our Team', 'Contact Us', 'FAQ', 'Support']} />
        <FooterColumn title="Resources" links={['Tutorials', 'Templates', 'Blog', 'Events', 'Case Studies']} />
        <FooterColumn title="More" links={['Gallery', 'Testimonials', 'Partners', 'Jobs', 'News']} />
        <div>
          <h4 className="text-lg font-semibold mb-4">Email marketing</h4>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Create and Manage Media Production Projects</h5>
            <p className="text-sm text-gray-600 mb-2">By Lauren Best</p>
            <p className="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Link href="#" className="text-orange-500 hover:underline text-sm">Read</Link>
            <span className="text-gray-400 text-sm ml-4">9 min read</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#"><span className="text-gray-600 hover:text-gray-900">Privacy Policy</span></Link></li>
              <li><Link href="#"><span className="text-gray-600 hover:text-gray-900">Terms of Service</span></Link></li>
              <li><Link href="#"><span className="text-gray-600 hover:text-gray-900">Cookies Settings</span></Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            {/* Flexbox for horizontal icon alignment */}
            <ul className="flex space-x-4"> 
              <li><Link href="#"><FiFacebook className="text-gray-600 hover:text-gray-900 w-6 h-6" /></Link></li>
              <li><Link href="#"><FiTwitter className="text-gray-600 hover:text-gray-900 w-6 h-6" /></Link></li>
              <li><Link href="#"><FiInstagram className="text-gray-600 hover:text-gray-900 w-6 h-6" /></Link></li>
              <li><Link href="#"><FiLinkedin className="text-gray-600 hover:text-gray-900 w-6 h-6" /></Link></li>
              <li><Link href="#"><FiYoutube className="text-gray-600 hover:text-gray-900 w-6 h-6" /></Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-500">&copy; 2024 Medea. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;
