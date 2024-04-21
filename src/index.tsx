import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Main from './routes/main';
import ErrorRoute from './errorRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
   {
      path: '/assessment',
      element: <Main />,
      errorElement: <ErrorRoute />,
   },
]);
const persistor = persistStore(store);
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <RouterProvider router={router} />{' '}
         </PersistGate>
      </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
