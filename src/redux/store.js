import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice";
import { postsReducer } from "./posts/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
