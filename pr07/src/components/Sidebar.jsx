import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

function Sidebar({ onClose }) {
  const [visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Help', href: '#help' },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-72 
        bg-white/5 border-r border-white/20 shadow-lg z-50 
        flex flex-col p-4
        transform transition-transform duration-300 ease-in-out
        ${visible ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Close Button */}
      <div className="ml-auto">
        <button
          type="button"
          onClick={handleClose}
          className="p-2 rounded hover:bg-white/10 transition hover:cursor-pointer"
        >
          <RiCloseLine className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex-1 flex items-center justify-center">
        <nav className="flex flex-col space-y-3 w-full">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActiveLink(item.label)}
              className={`
                px-4 py-2 text-lg font-medium border border-white/20 rounded-xl transition text-center
                ${activeLink === item.label ? 'text-green-400' : 'text-white'}
                hover:bg-white/10
              `}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
