import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import roleReducer from './features/roleSlice';
import companyReducer from './features/companySlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    roles: roleReducer,
    companies: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 