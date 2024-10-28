import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Spicy League. All rights reserved.</p>
        <div className="mt-2">
          {/* <a href="/privacy" className="text-gray-400 hover:text-gray-200 mx-2">Privacy Policy</a>
          <a href="/contact" className="text-gray-400 hover:text-gray-200 mx-2">Contact Us</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
