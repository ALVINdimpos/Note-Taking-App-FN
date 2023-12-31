import React from 'react';

const DisplayNotes = ({ notes, onDeleteNote, onUpdateNote, searchTerm }) => {
    const normalizedSearchTerm = (typeof searchTerm === 'string' ? searchTerm : '').toLowerCase();

    const filteredNotes = notes.filter((note) => {
        const titleMatch = note.title.toLowerCase().includes(normalizedSearchTerm);
        const contentMatch = note.content.toLowerCase().includes(normalizedSearchTerm);
        return titleMatch || contentMatch;
    });


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-6">
            {filteredNotes.length === 0 ? (
                <p className="text-center text-gray-500">No notes available.</p>
            ) : (
                filteredNotes.map((note) => (
                    <div key={note.id} className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                        <p className="text-gray-600">{note.content}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => onUpdateNote(note.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => onDeleteNote(note.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DisplayNotes;
