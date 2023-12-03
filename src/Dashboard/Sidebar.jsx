import React from 'react';
import { FiHome, FiBook, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 h-screen w-64 text-white flex flex-col justify-between">
            <div>
                <div className="p-4 text-2xl font-semibold flex items-center space-x-2">
                    <FiBook className="text-white" size={24} />
                    <span>Dashboard</span>
                </div>
                <nav>
                    <ul className="space-y-2 py-4">
                        <li className="pl-4 hover:bg-gray-700 transition duration-300">
                            <a href="#" className="flex items-center">
                                <FiHome className="text-white" size={20} />
                                <span className="ml-2">Home</span>
                            </a>
                        </li>
                        <li className="pl-4 hover:bg-gray-700 transition duration-300">
                            <a href="#" className="flex items-center">
                                <FiBook className="text-white" size={20} />
                                <span className="ml-2">Notes</span>
                            </a>
                        </li>
                        <li className="pl-4 hover:bg-gray-700 transition duration-300">
                            <a href="#" className="flex items-center">
                                <FiUsers className="text-white" size={20} />
                                <span className="ml-2">Users</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="text-center pb-4">
                <p className="text-sm text-gray-400">&copy; 2023 Alvin Coder</p>
            </div>
        </div>
    );
};

export default Sidebar;
