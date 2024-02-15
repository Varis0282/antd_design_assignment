import { loader } from "./loaderReducer";
import { configureStore } from "@reduxjs/toolkit";
import { data } from "./dataReducer";

const store = configureStore({
  reducer: {
    loaders: loader.reducer,
    data: data.reducer
  },
});

export default store;
