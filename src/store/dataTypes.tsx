import { Product, Supplier } from "../types";

export const PRODUCTS = "products";
export const SUPPLIERS = "suppliers";

/**
 * モデルデータの型定義
 */
export interface ModelData {
  products: Product[];
  suppliers: Supplier[];
}

/**
 * ステートデータの型定義
 */
export interface StateData {
  editing: boolean;
  selectedId: number;
  selectedType: keyof ModelData; // "products" | "suppliers"
}

/**
 * ストアの型定義
 */
export interface StoreData {
    modelData: ModelData;
    stateData: StateData;
    // グローバルな状態も含める
    editing: boolean;
    selectedId: number;
    selectedType: keyof ModelData;
  }

/**
 * アクションのペイロード型
 */
export interface ActionPayload<T> {
  id?: number;
  dataType: keyof ModelData;
  payload: T;
}