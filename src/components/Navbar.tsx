import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

interface NavbarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className={`fixed top-0 right-0 z-40 min-h-screen transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-blue-500 text-white p-5`}>
            <button onClick={() => setIsOpen(false)} className="mb-5 text-xl text-white">
                <FiX />
            </button>
            <ul>
                <li className="mb-3">
                    <Link to="/" className="hover:text-blue-200">Tela 1</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-blue-200">Tela 2</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
