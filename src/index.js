import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from './store/configureStore';


const { appStore, appPersistor } = configureStore();
ReactDOM.render(<Provider store={appStore}>
    <PersistGate loading={null} persistor={appPersistor}>
        <App />
    </PersistGate>
</Provider>, document.querySelector("#root"));