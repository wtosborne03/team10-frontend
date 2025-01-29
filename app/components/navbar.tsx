import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Driver Rewards</div>
                <div className=" md:flex space-x-4">
                    <NavLink to="/" className="text-gray-300 hover:text-white">Home</NavLink>
                    <NavLink to="/about" className="text-gray-300 hover:text-white">About</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
