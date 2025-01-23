import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  startTime: string;
  category: string;
  isActive: boolean;
  endTime: string | null;
}
const initialState: Task[] = [
  // {
  //   id: 1,
  //   startTime: '2025-01-21T14:18:35.672Z',
  //   category: 'CSS Dev',
  //   isActive: false,
  //   endTime: '2025-01-21T14:27:17.041Z',
  // },
];

const taskReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    updateTask(state, action: PayloadAction<{ key: number; value: Task }>) {
      const index = state.findIndex(({ id }) => id === action.payload.key);
      state[index] = { ...state[index], endTime: action.payload.value.endTime };
    },
    deleteTask(state, action: PayloadAction<{ key: number }>) {
      return state.filter((task) => task.id !== action.payload.key);
    },
  },
});
export const { addTask, updateTask, deleteTask } = taskReducer.actions;
export default taskReducer.reducer;
