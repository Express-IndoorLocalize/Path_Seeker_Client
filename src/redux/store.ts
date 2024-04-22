import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from "./user/userSlice";

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine reducers using combineReducers
const rootReducer = combineReducers({
    user: userReducer,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware setup
// const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;