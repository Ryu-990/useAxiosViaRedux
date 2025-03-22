import React, { Component } from "react";
import { Product } from './types'; 


interface ProductTableRowProps {
  product: Product;
  editCallback: (product: Product) => void;
  deleteCallback: (product: Product) => void;
}

export class ProductTableRow extends Component<ProductTableRowProps> {
  render(): React.ReactElement {
    let p = this.props.product;
    return (
      <tr>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.category}</td>
        <td className="text-right">${Number(p.price).toFixed(2)}</td>
        <td>
          <button 
            className="btn btn-warning btn-sm me-2"
            onClick={() => this.props.editCallback(p)}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger btn-sm me-2"
            onClick={() => this.props.deleteCallback(p)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
/**
 * 
 インターフェースの追加：

Product
- 製品データの型定義
ProductTableRowProps
- コンポーネントのprops型定義
クラスコンポーネントにジェネリック型パラメータを追加：
Component<ProductTableRowProps>

render
メソッドの戻り値の型を指定：
JSX.Element

これらの変更により、型安全性が向上し、開発時のエラー検出が容易になります。
 */