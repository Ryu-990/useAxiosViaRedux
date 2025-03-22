import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

// パラメータの型定義
interface RequestErrorParams {
  message: string;
}

// Propsの型定義
interface RequestErrorProps {
  message?: string;
}

// クラスコンポーネントをファンクションコンポーネントに変更
export const RequestError: React.FC<RequestErrorProps> = () => {
  const { message } = useParams<{ message: string }>();

  return (
    <div>
      <h5 className="bg-danger text-center text-white m-2 p-3">
        {message}
      </h5>
      <div className="text-center">
        <Link to="/" className="btn btn-secondary">
          OK
        </Link>
      </div>
    </div>
  );
};