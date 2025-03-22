import React, { useState, useEffect } from "react";
import { RestDataSource } from "./webservice/RestDataSource";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "./types";

interface IsolatedTableState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const IsolatedTable: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<IsolatedTableState>({
    products: [],
    loading: true,
    error: null,
  });

  const handleError = (err: string) => {
    setState((prev) => ({ ...prev, error: err, loading: false }));
    navigate(`/error/${err}`);
  };

  const dataSource = new RestDataSource(
    "http://localhost:3500/products",
    handleError
  );

  const deleteProduct = async (product: Product) => {
    if (!product.id && product.id !== 0) {
      handleError("無効な商品IDです");
      return;
    }
  
    try {
      // 非同期で削除処理を待つ
      await dataSource.Delete(product, () => {
        setState((prev) => ({
          ...prev,
          products: prev.products.filter((p) => p.id !== product.id),
        }));
      });
  
      // 削除が成功したら/isolatedにナビゲート
      navigate("/isolated");
    } catch (error) {
      handleError("削除に失敗しました");
    }
  };
  
  

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const data = await dataSource.GetData();  // 修正: 引数なしで呼び出す
          setState((prev) => ({
            ...prev,
            products: data,
            loading: false,
          }));
        } catch (error) {
          handleError("データの取得に失敗しました");
        }
    };    

    fetchProducts();
  }, []);
  
  

  if (state.loading) {
    return (
      <div className="text-center p-3">
        <h4>Loading products...</h4>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="alert alert-danger m-3">
        <h4>Error</h4>
        <p>{state.error}</p>
      </div>
    );
  }

  return (
    <table className="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th colSpan={5} className="bg-info text-white text-center h4 p-2">
            (Isolated) Products
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
        {state.products.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td className="text-right">${Number(p.price).toFixed(2)}</td>
            <td>
              <Link
                className="btn btn-sm btn-warning mx-2"
                to={`/isolated/edit/${p.id}`}
              >
                Edit
              </Link>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={() => deleteProduct(p)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="text-center">
          <td colSpan={5}>
            <Link to="/isolated/create" className="btn btn-info">
              Create
            </Link>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
