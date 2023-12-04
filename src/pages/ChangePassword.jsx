import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetNewPasswordMutation } from '../redux/api/apiSlice';
import zxcvbn from 'zxcvbn';
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
    const [passwordStrength, setPasswordStrength] = useState(0);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Update password strength
        if (e.target.name === 'newPassword') {
            const result = zxcvbn(e.target.value);
            setPasswordStrength(result.score);
        }
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
            toast.error(
                error?.data?.info || 'Error setting new password'
            );
        }
    };

    useEffect(() => {
        if (setNewPasswordSuccess) {
            toast.success('Password changed successfully');
            navigate('/');
        }
        if (setNewPasswordError) {
            toast.error(
                setNewPasswordErrorMessage?.data?.info ||
                'Error setting new password'
            );
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
                        {/* Password strength meter */}
                        {formData.newPassword && (
                            <div className="mt-2">
                                <progress
                                    value={passwordStrength}
                                    max="4"
                                    className={`w-full progress-${passwordStrength}`}
                                />
                                <p className={`text-sm mt-1 text-${passwordStrengthColor(passwordStrength)}`}>
                                    Password Strength: {passwordStrengthDescription(passwordStrength)}
                                </p>
                            </div>
                        )}
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

// Helper functions for password strength indicator
const passwordStrengthColor = (strength) => {
    switch (strength) {
        case 0:
        case 1:
            return 'red-500';
        case 2:
            return 'yellow-500';
        case 3:
            return 'blue-500';
        case 4:
            return 'green-500';
        default:
            return 'gray-500';
    }
};

const passwordStrengthDescription = (strength) => {
    switch (strength) {
        case 0:
            return 'Very Weak';
        case 1:
            return 'Weak';
        case 2:
            return 'Fair';
        case 3:
            return 'Strong';
        case 4:
            return 'Very Strong';
        default:
            return '';
    }
};
export default ChangePassword;
