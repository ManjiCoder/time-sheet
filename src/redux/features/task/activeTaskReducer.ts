import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskId: null,
  categoryId: null,
  isActive: false,
};

const activeTaskReducer = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    setActiveTask(state, action) {
      return { ...state, ...action.payload };
    },
    resetActiveTask() {
      return initialState;
    },
  },
});

export const { setActiveTask, resetActiveTask } = activeTaskReducer.actions;

export default activeTaskReducer.reducer;
