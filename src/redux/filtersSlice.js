import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        name: ''
    },
    reducers: 
        {addFilter(state, action){
    state.name = action.payload
    }}
})

export const { addFilter} = filterSlice.actions;
export const selectNameFilter = state => state.filters.name;
export const filtersReducer =  filterSlice.reducer;