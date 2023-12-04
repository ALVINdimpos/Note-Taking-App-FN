import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { useRegisterMutation } from '../redux/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';
const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();
    const [register, { isLoading: registerLoading, isSuccess: registerSuccess, isError: registerError, error: registerErrorMessage }] = useRegisterMutation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Update password strength
        if (name === 'password') {
            const result = zxcvbn(value);
            setPasswordStrength(result.score);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const result = register({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
        } catch (error) {
           toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        if (registerSuccess) {
            toast.success("Register Successfully")
            navigate('/');
        } else if (registerError) {
            toast.error(registerErrorMessage)
        }
    }
        , [registerSuccess])

    return (
        <div className='register'>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div
                        className={`mb-4 ${formData.password !== formData.confirmPassword ? 'text-red-500' : ''
                            }`}
                    >
                        <label htmlFor="firstName" className="block text-gray-600 text-sm font-semibold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />

                    </div>
                    <div
                        className={`mb-4 ${formData.password !== formData.confirmPassword ? 'text-red-500' : ''
                            }`}
                    >
                        <label htmlFor="lastName" className="block text-gray-600 text-sm font-semibold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div
                        className={`mb-4 ${formData.password !== formData.confirmPassword ? 'text-red-500' : ''
                            }`}
                    >
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

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                        {/* Password strength meter */}
                        {formData.password && (
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
                        Register
                    </button>
                </form>
            </div>
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

export default Register;
