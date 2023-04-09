// Import the necessary packages
import React from "react";
import ReactDOM from "react-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Define the slice using Redux Toolkit
export const mainStoreSlice = createSlice({
  name: "counter",
  initialState: { isLoaderOpen: false },
  reducers: {
    openLoader: (state) => {
      console.log("state==========>", state.isLoaderOpen);
      state.isLoaderOpen = false;
    },
    closeLoader: (state) => {
      console.log("state==========>", state.isLoaderOpen);
      state.isLoaderOpen = false;
    },
  },
});

// Create the Redux store using Redux Toolkit
export const store = configureStore({
  reducer: mainStoreSlice.reducer,
});
