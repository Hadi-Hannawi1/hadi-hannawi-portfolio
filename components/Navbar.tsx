import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/#projects' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight uppercase z-50 mix-blend-difference">
          Hadi Hannawi
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-40">
          <div className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className="text-4xl font-light text-white hover:text-neutral-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-500 mt-8"
              >
                Admin
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;