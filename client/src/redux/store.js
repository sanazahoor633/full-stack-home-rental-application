import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import state from './state'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,

}
const persistedReducer = persistReducer(persistConfig, state)


const store = configureStore({
    reducer: persistedReducer,
    middleware:  (getDefaultMiddleware) => {
     return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER  ]
            }
        })
    }
});


export let persistor = persistStore(store);
export default store