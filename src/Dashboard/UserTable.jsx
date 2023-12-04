import React, { useEffect } from 'react';
import { useLazyGetUsersQuery } from '../redux/api/apiSlice';

const UserTable = ({ onOpenDeleteModal, onOpenEditModal, onOpenUpdateRoleModal }) => {
    // Fetch users from the API
    const [getUsers, { data: users, isLoading, error }] = useLazyGetUsersQuery();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Oh no, there was an error</div>;
    }
    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Table</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.data?.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.firstName} {user.lastName}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border"> {user.roleId === 2 ? 'Admin' : user.roleId === 1 ? 'User' : 'Other Role'}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => onOpenDeleteModal(user.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => onOpenEditModal(user.id)}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onOpenUpdateRoleModal(user.id)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                >
                                    Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
