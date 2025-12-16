import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-4'>
        {/* Logo & Info */}
        <div className='space-y-4'>
          <Link to='/' className='flex items-center gap-2'>
            <h1 className='text-red-500 text-2xl font-bold'>My<span className="text-white text-2xl font-bold font-serif">Store</span></h1>
          </Link>
          <p className='text-sm'>Powering Your World with the Best in Electronics.</p>
          <div className='flex items-start gap-2 text-sm'>
            <HiLocationMarker className='text-red-500 mt-1' />
            <span>
              Shop no 410 4th Floor, Mehta Chamber,<br />
              Opp. Railway Station, above Shabri Hotel,<br />
              Nalasopara East, Mumbai 401209
            </span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <HiMail className='text-red-500' />
            <span>support@MyStore.com</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <HiPhone className='text-red-500' />
            <span>+91 8010809489</span>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className='text-xl font-semibold mb-2'>Customer Service</h3>
          <ul className='text-sm space-y-2'>
            <li className='hover:text-red-500 cursor-pointer'>Contact Us</li>
            <li className='hover:text-red-500 cursor-pointer'>Shipping & Returns</li>
            <li className='hover:text-red-500 cursor-pointer'>FAQs</li>
            <li className='hover:text-red-500 cursor-pointer'>Order Tracking</li>
            <li className='hover:text-red-500 cursor-pointer'>Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-xl font-semibold mb-2'>Follow Us</h3>
          <div className='flex space-x-4 mt-2 text-2xl text-red-500'>
            <FaFacebook className='hover:text-white cursor-pointer' />
            <FaInstagram className='hover:text-white cursor-pointer' />
            <FaTwitterSquare className='hover:text-white cursor-pointer' />
            <FaPinterest className='hover:text-white cursor-pointer' />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className='text-xl font-semibold mb-2'>Stay in the Loop</h3>
          <p className='text-sm'>Subscribe to get special offers, free giveaways, and more</p>
          <form className='mt-4 flex flex-col sm:flex-row gap-2'>
            <input 
              type="email" 
              placeholder='Your email address'
              className='w-full p-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <button type='submit' className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'>Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>MyStore</span>. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
