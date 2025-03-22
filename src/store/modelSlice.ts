import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Supplier } from '../types';

export const PRODUCTS = "products";
export const SUPPLIERS = "suppliers";

export interface ModelData {
  [PRODUCTS]: Product[];
  [SUPPLIERS]: Supplier[];
  editing: string | null; // 追加: 編集中のアイテムのタイプ
  editingId: number | null; // 追加: 編集中のアイテムの ID
}

export const initmodelData: ModelData = {
  [PRODUCTS]: [
    { id: 1, name: "Trail Shoes", category: "Running", price: 100 },
    { id: 2, name: "Thermal Hat", category: "Running", price: 12 },
    { id: 3, name: "Heated Gloves", category: "Running", price: 82.50 }
  ],
  [SUPPLIERS]: [
    { id: 1, name: "Zoom Shoes", city: "London", products: [1] },
    { id: 2, name: "Cosy Gear", city: "New York", products: [2, 3] }
  ],
  editing: null, // 初期値
  editingId: null, // 初期値
};
/**
 * アクションクリエーターとは、アプリケーションからデータを受け取り、
 * ストアデータへの変更を記述するアクションを返す関数。
 */
const modelSlice = createSlice({
  name: 'model',
  initialState: initmodelData,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      // `id` が undefined の場合には 0 を使って次の ID を計算する
      const nextId = state[PRODUCTS].reduce(
        (maxId, product) => Math.max(maxId, product.id ?? 0), // `undefined` の場合は 0 を使用
        0 // 初期値として 0 を設定
      ) + 1;
    
      state[PRODUCTS].push({
        ...action.payload,
        id: nextId,
      } as Product);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state[PRODUCTS].findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state[PRODUCTS][index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state[PRODUCTS] = state[PRODUCTS].filter(p => p.id !== action.payload);
    },
    addSupplier: (state, action: PayloadAction<Omit<Supplier, 'id'>>) => {
      // `id` が undefined の場合には 0 を使って次の ID を計算する
      const nextId = state[SUPPLIERS].reduce(
          (maxId, supplier) => Math.max(maxId, supplier.id ?? 0), // `undefined` の場合は 0 を使用
          0 // 初期値として 0 を設定
      ) + 1;
  
      state[SUPPLIERS].push({
          ...action.payload,
          id: nextId,
      } as Supplier);
    
  },
    
    
    updateSupplier: (state, action: PayloadAction<Supplier>) => {
      const index = state[SUPPLIERS].findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state[SUPPLIERS][index] = action.payload;
      }
    },
    deleteSupplier: (state, action: PayloadAction<number>) => {
      state[SUPPLIERS] = state[SUPPLIERS].filter(s => s.id !== action.payload);
    },
    // 追加: 編集状態を管理する reducer
    startEditing: (state, action: PayloadAction<{ type: string; id: number }>) => {
      console.log('Starting edit for:', action.payload);  // ここで確認
      state.editing = action.payload.type;
      state.editingId = action.payload.id;
    },
    stopEditing: (state) => {
      state.editing = null;
      state.editingId = null;
    },
    
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  startEditing, // 追加: アクションクリエイター
  stopEditing, // 追加: アクションクリエイター
} = modelSlice.actions;

export default modelSlice.reducer;