import instagramIcon from '../../assets/img/instagram.png'
import facebookIcon from '../../assets/img/facebook.png'
import twitterIcon from '../../assets/img/twitter-logo.png'

import logo from '../../assets/logo/pizzaStreet-main-logo.png'

export default function Footer() {
  return (
    <footer className="mt-14 bg-red-500 pt-20 pb-8 px-6 md:px-20 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="footer logo image" />
        </div>

        <div>
          <h3 className="poppins_semiBold text-lg mb-2">Opening Time</h3>
          <ul className="poppins-regular text-1xl">
            <li className='mt-4'>Mon - Fri: 11:00 AM - 11:00 PM</li>
            <li className='mt-4'>Sat - Sun: 12:00 PM - 12:00 AM</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="poppins-regular text-1xl">
            <li className='mt-4'>Home</li>
            <li className='mt-4'>Our Menu</li>
            <li className='mt-4'>About Us</li>
            <li className='mt-4'>Cart</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Social Media</h3>
          <ul className="flex gap-4">
            <li><img className='h-10 w-10 mt-4' src={instagramIcon} alt="footer instagram icon" /></li>
            <li><img className='h-10 w-10 mt-4' src={facebookIcon} alt="footer facebook icon" /></li>
            <li><img className='h-10 w-10 mt-4' src={twitterIcon} alt="footer twitter icon" /></li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-red-400" />
      <div className="flex justify-end poppins-regular text-sm">
        <p>&copy; {new Date().getFullYear()} Your PizzaStreet. All rights reserved.</p>
      </div>
    </footer>
  );
}