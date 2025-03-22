import { configureStore } from "@reduxjs/toolkit";
import modelReducer from './modelSlice'; // 後述する modelSlice.ts

import { useDispatch } from 'react-redux';

// configureStoreを使ってストアを作成
const store = configureStore({
  reducer: {
    model: modelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
export {
  addProduct,
  addSupplier,
  deleteProduct,
  deleteSupplier,
  updateProduct,
  updateSupplier,
  startEditing,
  stopEditing
} from "./modelSlice";