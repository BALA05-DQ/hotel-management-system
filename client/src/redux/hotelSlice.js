import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotels",

  initialState: {
    hotels: [],
  },

  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },

    removeHotel: (state, action) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
    },
  },
});

export const { setHotels, removeHotel } = hotelSlice.actions;

export default hotelSlice.reducer;