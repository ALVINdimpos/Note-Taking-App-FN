import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../redux/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken } from '../redux/Reducers/authSlice';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [
        login,
        {
            data: loginData,
            isLoading: loginLoading,
            isSuccess: loginSuccess,
            isError: loginError,
            error: loginErrorMessage,
        },
    ] = useLoginMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login({
                email: formData.email,
                password: formData.password,
            });
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    useEffect(() => {
        if (loginSuccess) {
            setInvalidLogin(false);
            dispatch(setUser(loginData));
            dispatch(setToken(loginData?.token));
            navigate('/note');
        } else if (loginError) {
            setInvalidLogin(true);
            setSuccessMessage('');
            console.log('Login error:', loginErrorMessage);
        }
    }, [loginData, loginSuccess, loginError]);

    return (
        <div className="login">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <div
                    className="flex flex-col justify-center items-center mb-4"
                >
                    <h2 className="text-3xl font-bold mb-4">Login to your account</h2>
                    <p>Don’t have an account? <span
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <Link to="/register">Sign Up Free!</Link>
                    </span></p>
                </div>
                {invalidLogin && (
                    <div className="flex justify-center items-center mb-2">
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                            role="alert"
                        >
                            <span className="block sm:inline text-red-500">
                                Invalid login, please try again
                            </span>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <span className="block sm:inline text-green-500">
                        {successMessage}
                    </span>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            placeholder='Enter your password'
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="
                        flex flex-wrap 
                        justify-between 
                        items-center 
                        mb-4
                    ">
                        <div className="
                            col-xs-6 col-sm-6
                        ">
                            <label className="
                                inline-flex 
                                items-center

                            ">
                                <input type="checkbox" value="remember-me" />
                                <span className="label-text
                                    ml-2
                                    
                                    ">Remember me</span>
                            </label>
                        </div>
                        <div className="
                            col-xs-6 col-sm-6
                        ">
                            <p className="
                                text-right
                                text-blue-500 hover:text-blue-600
                            ">
                                <Link className="lnk-toggler" data-panel=".panel-forgot" to="/reset-password">Forgot password?</Link>
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
