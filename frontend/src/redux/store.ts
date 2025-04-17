import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import roleReducer from './features/roleSlice';
import companyReducer from './features/companySlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    roles: roleReducer,
    companies: companyReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 