import React, { useEffect } from 'react';
import { useLazyGetUserByIdQuery } from '../redux/api/apiSlice';
const EditUserModal = () => {
    // Fetch user from the API
    const userId = localStorage.getItem('editUserId');
    const [getUserById, { data: user, isLoading, error }] = useLazyGetUserByIdQuery();
    condst[userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const userNameHandler = (event) => {
        setUserName(event.target.value);
    };
    const emailHandler = (event) => {
        setEmail(event.target.value);
    };

    const getUserByIdData = async () => {
        try {
            const { data: responseData } = await getUserById({
                id: userId,
            }).unwrap();
            console.log('User Data:', responseData);
            // Update user state
        } catch (error) {
            console.error('Error getting user', error);
        }
    }
    const handleUpdate = () => {
        // Update user

    }

    useEffect(() => {
        getUserByIdData();
    }
        , []);
console.log('User Data:', user);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-1/3 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                {/* Add form fields for editing user information */}
                <form>
                    {/* Example: */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            User Name
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.data?.firstName}
                            onChange={userNameHandler}
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                           Email
                        </label>
                        <input
                            type="email"
                            defaultValue={user?.data?.email}
                            onChange={emailHandler}
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
        
                    <div className="flex justify-end">
                        <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
                            Save Changes
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

export default EditUserModal;
