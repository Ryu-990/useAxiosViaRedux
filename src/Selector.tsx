import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Routes, Navigate,useNavigate } from "react-router-dom";
import { ProductDisplay } from "./ProductDisplay";
import { SupplierDisplay } from "./SupplierDisplay";
import { ToggleLink } from "./routing/ToggleLink";
import { RouteInfo } from "./routing/RouteInfo";
import { NavigationPrompt } from "./routing/NavigationPrompt";
import { CustomPrompt } from "./routing/CustomPrompt";
import { IsolatedTable } from "./IsolatedTable";
import { IsolatedEditor } from "./IsolatedEditor";

interface SelectorProps {
    children: React.ReactNode;
}

interface LayoutProps {
    getUserConfirmation: (message: string, navCallback: (allow: boolean) => void) => void;
    children: React.ReactNode;
}

interface RouteType {
    component: React.ReactElement;
    name: string;
    url: string;
}

const Layout: React.FC<LayoutProps> = ({ getUserConfirmation, children }) => {
  const navigate = useNavigate(); // Get the navigate function here
  const routes = React.Children.map(children, (child: any) => ({
      component: child,
      name: child.props.name,
      url: `/${child.props.name.toLowerCase()}`
  })) || [];

  return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-2">
                  <ToggleLink to="/isolated">Isolated Data</ToggleLink>
                  {routes?.map((r: RouteType) => (
                      <ToggleLink key={r.url} to={r.url}>
                          {r.name}
                      </ToggleLink>
                  ))}
              </div>
              <div className="col">
                  <NavigationPrompt
                      message={loc => `Do you want to navigate to ${loc.pathname}`}
                      getUserConfirmation={getUserConfirmation}
                  />
                  <Routes>
                      <Route path="/isolated" element={
                          <IsolatedTable/>
                      } />
                      <Route path="/isolated/:mode/:id?"
                          Component={IsolatedEditor} />
                      {routes.map((r: RouteType) => (
                          <Route
                              key={r.url}
                              path={r.url}
                              element={r.component}
                          />
                      ))}
                      <Route index element={<Navigate to="/products" />} />
                  </Routes>
              </div>
          </div>
      </div>
  );
};


export const Selector: React.FC<SelectorProps> = ({ children }) => {
    const [promptState, setPromptState] = useState({
        showPrompt: false,
        message: "",
        callback: (allow: boolean) => { }
    });

    const customGetUserConfirmation = (message: string, navCallback: (allow: boolean) => void) => {
        setPromptState({
            showPrompt: true,
            message: message,
            callback: (allow: boolean) => {
                navCallback(allow);
                setPromptState(prev => ({ ...prev, showPrompt: false }));
            }
        });
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/*" element={
                <Layout 
                    getUserConfirmation={customGetUserConfirmation} 
                    children={children} 
                />
            } />
        )
    );

    return (
        <>
            <CustomPrompt
                show={promptState.showPrompt}
                message={promptState.message}
                callback={promptState.callback}
            />
            <RouterProvider router={router} />
        </>
    );
};

/**
 *主な変更点：
BrowserRouterを
createBrowserRouterとRouterProvider
に置き換え
レイアウト部分を別コンポーネント
Layoutとして分離
ルート構造をcreateRoutesFromElementsを使用して定義
path="/*"を使用して、すべてのサブルートをLayoutコンポーネント内でハンドリング

これにより：
useBlockerが正常に動作
ナビゲーション時の確認ダイアログが表示される
ページ離脱時の確認も維持
既存のルーティング機能はそのまま保持
*/