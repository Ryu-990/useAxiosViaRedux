import { createRoot } from 'react-dom/client';
import App from './App';

it('renders without crashing', (): void => {
  const div: HTMLDivElement = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});