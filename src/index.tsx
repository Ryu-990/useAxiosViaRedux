import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';


const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(  <StrictMode>
    <Provider store={store}>
    <App />
  </Provider>,
  </StrictMode>
  );
}

// アプリをオフラインで動作させて読み込みを高速化したい場合は、以下の
// unregister() を register() に変更できます。ただし、これにはいくつかの落とし穴があります。
// Service Workers の詳細については、bit.ly/CRA-PWAy/CRA-PWA を参照してください。
serviceWorker.unregister();

/**
 React 18では
ReactDOM.render()
メソッドが非推奨となり、代わりに
createRoot()
を使用する必要があります。

以下のように修正してください：
 */