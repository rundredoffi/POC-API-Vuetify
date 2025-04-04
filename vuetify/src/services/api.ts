import axios from "axios";

const API_URL = "http://localhost:3001/items";

export const getItems = () => axios.get(API_URL);
export const addItem = (name) => axios.post(API_URL, { name });
export const updateItem = (id, name) => axios.put(`${API_URL}/${id}`, { name });
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
