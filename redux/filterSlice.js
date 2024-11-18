import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    
  ];

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addBike: (state, action) => {
      state.push(action.payload)
    },
    
    setBikeFromApi: (state, action) => {
      return action.payload;
    }
  },
});

export const { addBike, setBikeFromApi} = filterSlice.actions;
export default filterSlice.reducer;