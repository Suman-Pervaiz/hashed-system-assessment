

"use client";

import useSWR from "swr";
import { useState } from "react";
import { Pagination, Skeleton } from "@mantine/core";
import { toast } from "react-toastify";

import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "@/app/services/api/user.js";

import useUserStore from "@/store/userStore";
import AddUserModal from "@/app/components/AddUserModal";
import EditUserModal from "@/app/components/EditUserModal";
import DeleteUserModal from "@/app/components/DeleteUserModal";

//fetcher for swr 
const fetcher = async () => {
  const res = await getAllUsers();
  return res;
};

const UsersPage = () => {
  const { data = [], mutate, isLoading } = useSWR("allUsers", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const { isModalOpen, modalType, selectedUser, closeModal, openModal } =
    useUserStore();

  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 10;

  const filteredData = data.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
    );
  });

  //pagination from mantine UI
  const startIndex = (activePage - 1) * pageSize;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleSubmit = async (formData) => {
    try {
      if (modalType === "add") {
        const newUser = await addUser(formData);

        toast.success("User added successfully");

        //add new user to the Top not to the end
        mutate((prev = []) => [newUser, ...prev], false);
         closeModal();
         return; 
      }

      if (modalType === "edit") {
        await updateUser(selectedUser.id, formData);
        toast.success("User updated successfully");
      }

      if (modalType === "delete") {
        await deleteUser(selectedUser.id);
        toast.success("User deleted successfully");
        closeModal();
      }

      mutate(); //Instant UI Update
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

    
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Users
        </h1>

        <div className="flex items-center gap-3">

         
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

  
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow cursor-pointer"
          >
            + Add User
          </button>

        </div>
      </div>

    {/* table section */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

         {/* skeleton from MantineUI */}
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">
                    <Skeleton height={12} width="70%" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton height={12} width="80%" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton height={12} width="60%" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton height={20} width="50%" />
                  </td>
                </tr>
              ))
            ) : paginatedData.length === 0 ? (

            //  if there's no users in the DB
              <tr>
                <td colSpan={4} className="text-center py-16">
                  <p className="text-gray-500 text-lg font-medium">
                    No user found!
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Would like to Add?
                  </p>
                </td>
              </tr>

            ) : (

             
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => openModal("edit", user)}
                        className="px-3 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openModal("delete", user)}
                        className="px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    
      <div className="flex justify-end mt-5">
        <Pagination
          total={Math.ceil(filteredData.length / pageSize)}
          value={activePage}
          onChange={setActivePage}
        />
      </div>

      {/* Modals */}
      <AddUserModal
        opened={isModalOpen && modalType === "add"}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <EditUserModal
        opened={isModalOpen && modalType === "edit"}
        onClose={closeModal}
        user={selectedUser}
        onSubmit={handleSubmit}
      />

      <DeleteUserModal
        opened={isModalOpen && modalType === "delete"}
        onClose={closeModal}
        user={selectedUser}
        onConfirm={handleSubmit}
      />

    </div>
  );
};

export default UsersPage;