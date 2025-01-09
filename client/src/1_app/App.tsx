import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import RouterProvider from './router/RouterProvider';
import LoadingSpinner from '../6_shared/ui/LoadingSpinner';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import InitProvider from './providers/initProvider/InitProvider';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<h1>Возникла ошибка</h1>}>
        <Suspense fallback={<LoadingSpinner />}>
          <Provider store={store}>
            <InitProvider>
              <RouterProvider />
            </InitProvider>
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
