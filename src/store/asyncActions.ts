import { createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS, SUPPLIERS } from './modelSlice';

// データ取得用の非同期アクション
export const fetchData = createAsyncThunk<
  { dataType: string; data: any[] },
  { dataType: string }
>(
  'data/fetch',
  async ({ dataType }, { rejectWithValue }) => {
    try {
      return { dataType, data: [] };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// データ保存用の非同期アクション
export const storeData = createAsyncThunk(
  'data/store',
  async ({ dataType, data }: { dataType: string, data: any }, { rejectWithValue }) => {
    try {
      // ミドルウェアでハンドリングするための情報を返す
      return { dataType, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// データ更新用の非同期アクション
export const updateData = createAsyncThunk(
  'data/update',
  async ({ dataType, data }: { dataType: string, data: any }, { rejectWithValue }) => {
    try {
      // ミドルウェアでハンドリングするための情報を返す
      return { dataType, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// データ削除用の非同期アクション
export const deleteData = createAsyncThunk(
  'data/delete',
  async ({ dataType, id }: { dataType: string, id: number }, { rejectWithValue }) => {
    try {
      // ミドルウェアでハンドリングするための情報を返す
      return { dataType, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);