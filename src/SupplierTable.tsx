import React, { Component } from "react";
import { SupplierTableRow } from "./SupplierTableRow";
import { Supplier } from './types';
import  RootState from "./store";

interface SupplierTableProps {
  suppliers: Supplier[];
  editCallback: (supplier: Supplier) => void;
  deleteCallback: (supplier: Supplier) => void;
}

export class SupplierTable extends Component<SupplierTableProps> {
  render() {
    // 防御的なコーディング: suppliers が undefined の場合に空配列を使用
    const { suppliers = [] } = this.props;
    
    return (
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th colSpan={5}
              className="bg-primary text-white text-center h4 p-2">
              Suppliers
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Products</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            suppliers.map(s => (
              <SupplierTableRow
                supplier={s}
                key={s.id}
                editCallback={this.props.editCallback}
                deleteCallback={this.props.deleteCallback}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}