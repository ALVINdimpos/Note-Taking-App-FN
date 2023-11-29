// NotePage.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AddNote from '../NoteComponents/AddNote';
import UpdateNote from '../NoteComponents/UpdateNote';
import DisplayNotes from '../NoteComponents/DisplayNotes';
import DeleteNote from '../NoteComponents/DeleteNote';
import Header from '../conponent/Header';
import Loader from '../conponent/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useLazyGetNoteQuery, useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../redux/api/apiSlice';
import './note.css';
Modal.setAppElement('#root'); // Set the root element for accessibility

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [getNote, { data, error, isSuccess, isLoading:noteIsLoading }] = useLazyGetNoteQuery();
    const [createNote, { data: createNoteData, error: createNoteError, isSuccess: createNoteSuccess,isLoading:createNoteIsLoading}] = useCreateNoteMutation();
    const [deleteNote, { data: deleteNoteData, error: deleteNoteError, isSuccess: deleteNoteSuccess,isLoading:deleteNoteIsLoading}] = useDeleteNoteMutation();
    const [updateNote, { data: updateNoteData, error: updateNoteError, isSuccess: updateNoteSuccess,isLoading:updateNoteIsLoading}] = useUpdateNoteMutation();
    const getNoteData = async () => {
        try {
            const { data: responseData } = await getNote().unwrap();
            setNotes(responseData);
        } catch (error) {
            console.error('Error getting notes', error);
            toast.error('Error getting notes');
        }
    }
    useEffect(() => {
        getNoteData();
    }, []);
    const handleAddNote = (newNote) => {
        createNote({
            title: newNote.title,
            content: newNote.content
        })
        setAddModalOpen(false);
    };
    const handleUpdateNote = (noteId, updatedNote) => {
        updateNote({
            id: noteId,
            title: updatedNote.title,
            content: updatedNote.content
        })
        setUpdateModalOpen(false);
    };

    const handleDeleteNote = (noteId) => {
        deleteNote({
            id: noteId
        })
        setDeleteModalOpen(false);
    };
    useEffect(() => {
        if (deleteNoteSuccess) {
            toast.success('Note deleted successfully');
            getNoteData();
        }
        else if (deleteNoteError) {
            console.error('Error deleting note', deleteNoteError);
            toast.error('Error deleting note');
        }
    }
        , [deleteNoteSuccess])
    useEffect(() => {
        if (updateNoteSuccess) {
            toast.success('Note updated successfully');
            getNoteData();
        }
        else if (updateNoteError) {
            console.error('Error updating note', updateNoteError);
            toast.error('Error updating note');
        }
    }
        , [updateNoteSuccess])
    useEffect(() => {
        if (createNoteSuccess) {
            toast.success('Note created successfully');
            getNoteData();
        }
        else if (createNoteError) {
            console.error('Error creating note', createNoteError);
            toast.error('Error creating note');
        }
    }
        , [createNoteSuccess])
    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    return (
        <div>
            <Header
                onSearch={() => {
                    console.log('Search submitted:');
                }}
                onLogout={Logout}
            />
            <button
                onClick={() => setAddModalOpen(true)}
                className="w-fill bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none m-4"
            >
                Add Note
            </button>
            {noteIsLoading && <Loader />}
            <DisplayNotes
                notes={notes.length > 0 ? notes : []}
                onDeleteNote={(noteId) => {
                    setSelectedNote(noteId);
                    setDeleteModalOpen(true);
                }}
                onUpdateNote={(noteId) => {
                    setSelectedNote(noteId);
                    setUpdateModalOpen(true);
                }}
            />
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setAddModalOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <AddNote onAddNote={handleAddNote} buttonName={
                    createNoteIsLoading ? "Creating..." : 'Add Note'
                } />
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setUpdateModalOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <UpdateNote
                    onUpdateNote={handleUpdateNote}
                    noteId={selectedNote}
                    buttonName={
                        updateNoteIsLoading ? "Updating..." : 'Update Note'
                    }
                    initialData={notes.find((note) => note.id === selectedNote)}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
                buttonName={
                    deleteNoteIsLoading ? "Deleting..." : 'Delete Note'
                }
            >
                <DeleteNote onDeleteNote={() => handleDeleteNote(selectedNote)} />
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default NotePage;
