import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// APIs
import { ipfsApi } from "redux/services/ipfs";
import { tatumApi } from "redux/services/tatum";
import { userApi } from "redux/services/users";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [tatumApi.reducerPath]: tatumApi.reducer,
  [ipfsApi.reducerPath]: ipfsApi.reducer,
});

// create the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(tatumApi.middleware)
      .concat(ipfsApi.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);
