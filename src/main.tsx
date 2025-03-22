import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

it('renders without crashing', (): void => {
  const div: HTMLDivElement = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
