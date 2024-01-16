import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import profileReducer from "./reducers/profile"
import userReducer from "./reducers/user"

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer, profile: profileReducer },
});
