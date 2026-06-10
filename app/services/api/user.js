import axios from "axios";

const BASE_URL = "http://localhost:3001";

//get
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    return res?.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//addusers
export const addUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, data);
    return res?.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

//update
export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, data);
    return res?.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//delete
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};