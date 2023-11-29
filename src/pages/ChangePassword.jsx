import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetNewPasswordMutation } from '../redux/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './changePassword.css';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const { token } = useParams();
    const [setNewPassword, { isLoading: setNewPasswordLoading, isSuccess: setNewPasswordSuccess, isError: setNewPasswordError, error: setNewPasswordErrorMessage }] = useSetNewPasswordMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New Password and Confirm Password must match');
            return;
        }

        try {
            const result = setNewPassword({
                newPassword: formData.newPassword,
                token: token.split('=')[1],
            });
        } catch (error) {
            toast.error('Something went wrong');
            console.error('ChangePassword error:', error);
        }
    };

    useEffect(() => {
        if (setNewPasswordSuccess) {
            toast.success('Password changed successfully');
            navigate('/');
        }
        if (setNewPasswordError) {
            toast.error('Something went wrong');
            console.log('ChangePassword error:', setNewPasswordErrorMessage);
        }
    }, [setNewPasswordSuccess, setNewPasswordError]);

    return (
        <div className='changePassword'>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-600 text-sm font-semibold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Change Password
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChangePassword;
