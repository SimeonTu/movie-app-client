import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filteredMovies: [],
    searchFilter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload
    }
  },
});

export const { setMovies, setFilteredMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
