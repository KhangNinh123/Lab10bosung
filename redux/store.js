import { configureStore } from '@reduxjs/toolkit';
import bikesReducer from './filterSlice';

const store = configureStore({
  reducer: {
    bikes: bikesReducer,
  },
});

export default store;