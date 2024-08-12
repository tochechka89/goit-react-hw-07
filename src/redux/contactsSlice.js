import { createSelector, createSlice } from "@reduxjs/toolkit";
import { deleteContact, fetchContacts, fetchNewContact } from "./contactsOps";
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
                state.error = false;
            }).addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            }).addCase(fetchContacts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            }).addCase(fetchNewContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(fetchNewContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            }).addCase(fetchNewContact.rejected, (state) => {
                state.loading = false;
                state.error = true;
            }).addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
                state.loading = false;
            }).addCase(deleteContact.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

    }

})

export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, textFilter) => {
        console.log('selectFilteredContacts');
        return contacts.filter((contact) => {
            if (textFilter.trim() === '') {
                return contacts;
            }
            return contact.name.toLowerCase().includes(textFilter.toLowerCase());
        })
    })