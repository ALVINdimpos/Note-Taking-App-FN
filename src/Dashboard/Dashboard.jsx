import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import EditUserModal from "../Models/EditUserModal";
import DeleteUserModal from "../Models/DeleteUserModal";
import UpdateRoleModal from "../Models/UpdateRoleModal";

const Dashboard = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isUpdateRoleModalOpen, setUpdateRoleModalOpen] = useState(false);

  // Function to open the Delete User Modal
  const openDeleteModal = (id) => {
    localStorage.setItem('deleteUserId', id);
    setDeleteModalOpen(true);
  };

  // Function to open the Edit User Modal
  const openEditModal = (id) => {
 localStorage.setItem('editUserId', id);
    setEditModalOpen(true);
  };

  // Function to open the Update Role Modal
  const openUpdateRoleModal = () => {
    setUpdateRoleModalOpen(true);
  };

  // Function to close all modals
  const closeModals = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(false);
    setUpdateRoleModalOpen(false);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <div className="flex-1 p-8">
              <UserTable
                onOpenDeleteModal={openDeleteModal}
                onOpenEditModal={openEditModal}
                onOpenUpdateRoleModal={openUpdateRoleModal}
              />
              {isDeleteModalOpen && <DeleteUserModal  onCancel={closeModals} />}
              {isEditModalOpen && <EditUserModal onClose={closeModals} />}
              {isUpdateRoleModalOpen && <UpdateRoleModal onClose={closeModals} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
