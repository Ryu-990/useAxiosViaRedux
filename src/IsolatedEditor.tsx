import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RestDataSource } from "./webservice/RestDataSource";
import { ProductEditor } from "./ProductEditor";
import { Product } from "./types";

interface IsolatedEditorProps {
  dataSource?: RestDataSource;
}

export const IsolatedEditor: React.FC<IsolatedEditorProps> = ({
  dataSource: propDataSource,
}): React.ReactElement => {
  const navigate = useNavigate();
  const { mode, id } = useParams<{ mode: string; id: string }>();
  const [dataItem, setDataItem] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
  });

  const dataSourceRef = useRef(
    propDataSource ?? new RestDataSource("http://localhost:3500/products", () => {})
  );

  useEffect(() => {
    const loadProduct = async () => {
      if (mode === "edit" && id) {
        try {
          const data = await dataSourceRef.current.GetOne(id);
          setDataItem(data);
        } catch (error) {
          console.error("データ取得エラー:", error);
        }
      }
    };

    loadProduct();
  }, [mode, id]); // 依存配列から dataSource を削除

  const save = async (data: Product): Promise<void> => {
    if (mode === "create") {
      await dataSourceRef.current.Store(data, () => {
        navigate("/isolated");
      });
    } else {
      await dataSourceRef.current.Update(data, () => {
        navigate("/isolated");
      });
    }
  };

  const cancel = (): void => {
    navigate("/isolated");
  };

  return <ProductEditor key={dataItem.id} product={dataItem} saveCallback={save} cancelCallback={cancel} />;
};
