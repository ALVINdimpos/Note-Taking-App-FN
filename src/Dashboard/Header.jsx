// Header.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 

const Header = ({ onSearch, onLogout }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold md:text-3xl ">Notes App</h1>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for notes..."
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 md:w-96 text-slate-900"
                />
            </div>

            <div className="flex items-center">
                {/* User Avatar */}
                <div className="mr-4 relative">
                    <FaUserCircle
                        size={30}
                        className="cursor-pointer"
                        onClick={toggleDropdown}
                    />

                    {isDropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white p-4 flex rounded-md shadow-md text-black">
                            <ul className="flex flex-col gap-2 w-40
                            "
                            >
                                <li className="cursor-pointer" onClick={
                                    () => {

                                        navigate('/new-password');
                                    }
                                }>
                                    Change Password
                                </li>
                                <li className="cursor-pointer" onClick={
                                    () => {
                                        console.log('Change Password submitted:');
                                    }
                                }>
                                    edit profile
                                </li>
                                <li className="cursor-pointer" onClick={onLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <span className="hidden md:block">
                    {user?.userFistName}
                </span>
            </div>
        </header>
    );
};

export default Header;
