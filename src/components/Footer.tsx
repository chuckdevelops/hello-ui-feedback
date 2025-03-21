
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <p className="carti-font text-sm">CARTI CATALOG © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
