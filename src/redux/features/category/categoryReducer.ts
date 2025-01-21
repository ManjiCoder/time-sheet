import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = []
const catergoryReducer = createSlice({
    name:'category',
    initialState,
    reducers:{
        addCategory(state, action){
            state.push(action.payload)
        }
    }
})

export const {addCategory} = catergoryReducer.actions 
export default catergoryReducer.reducer