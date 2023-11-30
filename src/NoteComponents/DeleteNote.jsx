import React from 'react';

const DeleteNote = ({ onDeleteNote, buttonName }) => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Delete Note</h2>
            <p className="text-gray-600">Are you sure you want to delete this note?</p>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={onDeleteNote}
                >
                    {buttonName?buttonName:'Delete'}
                </button>
            </div>
        </div>
    );
};

export default DeleteNote;
