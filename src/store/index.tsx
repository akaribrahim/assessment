import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import dataReducer from './reducers/dataSlice';

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
};
const reducer = combineReducers({
   data: dataReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
