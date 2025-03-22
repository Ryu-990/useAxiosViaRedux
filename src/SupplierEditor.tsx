import React, { useState, ChangeEvent, useEffect } from "react";
import { Supplier } from "./types";

interface SupplierEditorProps {
  supplier: Supplier;
  saveCallback: (supplier: Supplier) => void;
  cancelCallback: () => void;
}

export const SupplierEditor: React.FC<SupplierEditorProps> = ({
  supplier,
  saveCallback,
  cancelCallback,
}) => {
  const [formData, setFormData] = useState<Supplier>({
    id: supplier.id, // `number` 型を維持
    name: supplier.name || "",
    city: supplier.city || "",
    products: supplier.products || [],
  });

  useEffect(() => {
    setFormData({
      id: supplier.id, // `number` 型のまま
      name: supplier.name || "",
      city: supplier.city || "",
      products: supplier.products || [],
    });
  }, [supplier]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "products"
        ? value.split(",").map((val) => parseInt(val, 10) || 0) // 数値以外は0に置き換え
        : value,
    }));
  };

  const handleSave = (): void => {
    console.log("Saving Supplier:", formData); // デバッグ用
    saveCallback(formData);
  };

  return (
    <div className="m-2">
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input
          id="id"
          className="form-control"
          name="id"
          type="number"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: parseInt(e.target.value, 10) || 0 })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" className="form-control" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input id="city" className="form-control" name="city" value={formData.city} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="products">Products</label>
        <input
          id="products"
          className="form-control"
          name="products"
          value={formData.products.join(",")}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary m-1" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={cancelCallback}>
          Cancel
        </button>
      </div>
    </div>
  );
};
