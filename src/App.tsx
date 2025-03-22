import React, { Component } from "react";
//import ProductsAndSuppliers from "./ProductsAndSuppliers";
import { Provider } from "react-redux";
import store from "./store";
import { Selector } from "./Selector";
import { ProductDisplay } from "./ProductDisplay";
import { SupplierDisplay } from "./SupplierDisplay";

export default function App() {
  // App.jsxなどで、ストアの状態を確認
console.log("Store state:", store.getState());
  return (
    <Provider store={store}>
      <Selector>
        <ProductDisplay name="Products" />
        <SupplierDisplay name="Suppliers" />
      </Selector>

    </Provider>
    
  );
}
///

/**
 * JSX.Element
の代わりに
React.ReactElement
を使用
必要な型定義ファイル（@types/react）がインストールされていることを確認
 */