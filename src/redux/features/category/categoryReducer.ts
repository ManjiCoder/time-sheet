import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JSX } from 'react';

export interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
}

const initialState: Category[] = [];
const catergoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      state.push(action.payload);
    },
  },
});

export const { addCategory } = catergoryReducer.actions;
export default catergoryReducer.reducer;
