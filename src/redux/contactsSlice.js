import { createSelector, createSlice } from "@reduxjs/toolkit";
import { deleteContact, fetchContacts, addContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при загрузке контактов';
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при добавлении контакта';
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при удалении контакта';
            });
    }
});

export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, textFilter) => {
        if (textFilter.trim() === '') {
            return contacts;
        }
        return contacts.filter(contact => 
            contact.name.toLowerCase().includes(textFilter.toLowerCase())
        );
    }
);