import { createRoot } from 'react-dom/client';
import App from './1_app/App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import { registerSW } from 'virtual:pwa-register';

(registerSW as (options?: { immediate: boolean }) => void)({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
