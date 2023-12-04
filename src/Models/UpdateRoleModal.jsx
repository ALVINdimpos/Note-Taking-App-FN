import React from 'react';

const UpdateRoleModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-1/3 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Update User Role</h2>
                <form>
                    {/* Example: */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            New Role
                        </label>
                        <select
                            className="mt-1 p-2 border w-full rounded-md"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-500 text-white py-2 px-4 rounded-md mr-2">
                            Update Role
                        </button>
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRoleModal;
