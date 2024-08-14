import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps"
import { selectNameFilter } from "./filtersSlice";


 const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: false,
    },
    extraReducers: builder => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;

            })
            .addCase(fetchContacts.rejected, (state) => {
                state.error = true;
                state.isLoading = false;
            })
            .addCase(addContact.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload)
            })
            .addCase(addContact.rejected, (state) => {
                state.error = true;
                state.isLoading = false;
            })
            .addCase(deleteContact.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            })
             .addCase(deleteContact.fulfilled, (state, action)=> {
                 state.isLoading = false;
                 state.items = state.items.filter(contact => contact.id !== action.payload.id)
             })
            .addCase(deleteContact.rejected, (state) => {
            state.error = true;
                state.isLoading = false;
        })
    }
 })

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], (contacts, filter) => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    }
)

export const contactsReducer = contactsSlice.reducer;
