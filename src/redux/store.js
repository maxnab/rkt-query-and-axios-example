import {configureStore} from '@reduxjs/toolkit'
import {usersApi} from "./usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(usersApi.middleware)
})