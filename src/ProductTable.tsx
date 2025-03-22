import React, { Component } from "react";
import { ProductTableRow } from "./ProductTableRow";
import { Product } from './types';

interface ProductTableProps {
  products: Product[];
  editCallback: (product: Product) => void;
  deleteCallback: (product: Product) => void;
}

export class ProductTable extends Component<ProductTableProps> {
  render(): React.ReactElement {
    // productsがない場合の処理を追加
    if (!this.props.products) {
      return <div>読み込み中...</div>;
    }
    return (
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th 
              colSpan={5}
              className="bg-primary text-white text-center h4 p-2"
            >
              Products
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th className="text-right">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map(p => (
            <ProductTableRow 
              product={p}
              key={p.id}
              editCallback={this.props.editCallback}
              deleteCallback={this.props.deleteCallback}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

/**
 * インターフェースの追加：

Product
- 製品データの型定義
ProductTableProps
- コンポーネントのprops型定義
クラスコンポーネントにジェネリック型パラメータを追加：
Component<ProductTableProps>

render
メソッドの戻り値の型を指定：
JSX.Element

HTML属性の型修正：

colSpan
を数値型に変更
これらの変更により、型安全性が向上し、開発時のエラー検出が容易になります。
 */