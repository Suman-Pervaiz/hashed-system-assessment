import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};