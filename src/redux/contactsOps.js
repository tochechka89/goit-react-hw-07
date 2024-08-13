import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://66a40d4644aa637045833ecd.mockapi.io/';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/contacts');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Ошибка при получении контактов!');
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact, thunkAPI) => {
    try {
        const response = await axios.post('/contacts', newContact);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Ошибка при добавлении контакта!');
    }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
    try {
        await axios.delete(`/contacts/${id}`);
        return id; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Ошибка при удалении контакта!');
    }
});