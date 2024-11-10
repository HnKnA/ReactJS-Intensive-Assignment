import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../services/apis/auth";
import { productApi } from "../../services/apis/product";
import { userApi } from "../../services/apis/user";
import { orderApi } from "../../services/apis/order";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/logging";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      sagaMiddleware
    ),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
