import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import {  toast } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
toast.warning("Disclaimer: This is just a test purposes only!")
root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
);


