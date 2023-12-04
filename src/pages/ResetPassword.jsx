import React, { useEffect, useState } from 'react';
import { useRessetPasswordMutation } from '../redux/api/apiSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './resetPassword.css';
const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [resetPassword, { isLoading: resetPasswordLoading, isSuccess: resetPasswordSuccess, isError: resetPasswordError, error: resetPasswordErrorMessage }] = useRessetPasswordMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const result = resetPassword({
                email: formData.email,
            });
        } catch (error) {
            toast.error('Something went wrong');
        }
    };
    useEffect(() => {
        if (resetPasswordSuccess) {
            console.log('ResetPassword success:', resetPasswordSuccess);
            toast.success("Reset Password Successfully please check your email")
        } else if (resetPasswordError) {
            console.log('ResetPassword error:', resetPasswordErrorMessage);
            toast.error(resetPasswordErrorMessage)
        }
    }
        , [resetPasswordSuccess])
    return (
        <div className='resetPassword'>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                        type="submit"
                        onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                        {
                            resetPasswordLoading ? 'Loading...' : 'Reset Password'
                }
                </button>
            </form>
            </div>
            <ToastContainer />
            </div>
    );
};

export default ResetPassword;
