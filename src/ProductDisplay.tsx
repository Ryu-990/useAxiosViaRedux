import React from "react";
import { ProductTable } from "./ProductTable";
import { ProductEditor } from "./ProductEditor";
import { Product } from './types';
import { useSelector, useDispatch } from "react-redux";
import { RootState, addProduct, updateProduct, deleteProduct, startEditing, stopEditing } from "./store";

interface ProductDisplayProps {
  name?: string;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ name }) => {
  const products = useSelector((state: RootState) => state.model.products);
  const editing = useSelector((state: RootState) => state.model.editing);
  const editingId = useSelector((state: RootState) => state.model.editingId);
  const dispatch = useDispatch();
/**
 * const useSelector: UseSelector<unknown>
import useSelector
redux ストアのステートにアクセスするためのフック。
このフックはセレクター関数を引数として受け取ります。
セレクターはストアのステートとともに呼び出されます。
このフックは、2 番目のパラメーターとしてオプションの等価比較関数を受け取ります。
これにより、選択されたステートを比較してコンポーネントを再レンダリングする必要があるかどうかを
判断する方法をカスタマイズできます。
 * 
 */


  const handleStartEditing = (product: Product): void => {
    dispatch(startEditing({ type: "products", id: product.id as number }));
  };

  const handleCreateProduct = (): void => {
    dispatch(startEditing({ type: "products", id: -1 }));
  };

  const handleCancelEditing = (): void => {
    dispatch(stopEditing());
  };

  const handleSaveProduct = (product: Product): void => {
    if (product.id === undefined) {
      dispatch(addProduct(product));
    } else {
      dispatch(updateProduct(product));
    }
    dispatch(stopEditing());
  };

  const handleDeleteProduct = (product: Product): void => {
    if (product.id !== undefined) {
      dispatch(deleteProduct(product.id));
    }
  };

  const selectedProduct = products.find(p => p.id === editingId) || { id: undefined, name: "", category: "", price: 0 };

  if (editing === "products") {
    return (
      <ProductEditor
        key={selectedProduct?.id ?? -1}
        product={selectedProduct}
        saveCallback={handleSaveProduct}
        cancelCallback={handleCancelEditing}
      />
    );
  }

  return (
    <div className="m-2">
      <ProductTable
        products={products}
        editCallback={handleStartEditing}
        deleteCallback={handleDeleteProduct}
      />
      <div className="text-center">
        <button className="btn btn-primary m-1" onClick={handleCreateProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
};