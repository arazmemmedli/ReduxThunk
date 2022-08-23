import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import usersReducer from "./reducers/users/userSlice";
import postsReducer from "./reducers/post/postSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users:usersReducer,
    posts:postsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
