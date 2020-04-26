import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";
import { userActiveReducer, changeSessionReducer } from "../reducers/user";
import { contactDetailReducer } from "../reducers/user/contact";

const encryptor = createEncryptor({
    secretKey: 'my-super-secret-key'
})

const config = {
    key: 'primary',
    storage,
    transforms: [encryptor],
    blacklist: [''],
    debug: true
}

const appReducer = combineReducers({
    userActiveReducer: userActiveReducer,
    changeSessionReducer: changeSessionReducer,
    contactDetailReducer: contactDetailReducer
});
const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(config, rootReducer);

export default () => {
    let appStore = createStore(persistedReducer);
    let appPersistor = persistStore(appStore);
    return {
        appStore, appPersistor
    }
}