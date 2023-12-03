import React, { useEffect } from 'react';
import { useDeleteUserMutation } from '../redux/api/apiSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const DeleteUserModal = ({ onCancel }) => {
    const userId = localStorage.getItem('deleteUserId');
    const [deleteUser, { data: deleteUsersData, error: deleteUsersError, isSuccess: deleteUsersSuccess, isLoading: deleteUsersIsLoading }] = useDeleteUserMutation();
   

    const handleDelete = () => {
        deleteUser({
            id: userId,
        });
        onCancel();
    };
    useEffect(() => {
        if (deleteUsersIsLoading) {
            toast.info('Deleting User');
        }
        if (deleteUsersSuccess) {
            toast.success('User Deleted');
        }
        if (deleteUsersError) {
            toast.error('Error Deleting User');
        }
    }
        , [deleteUsersIsLoading, deleteUsersSuccess, deleteUsersError]);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-1/3 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Delete User</h2>
                <p className="mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DeleteUserModal;
