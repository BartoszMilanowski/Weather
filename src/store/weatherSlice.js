import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectLocation: null,
    weatherConditions: null,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setSelectLocation(state, action) {
            state.selectLocation = action.payload;
        },
        setWeatherConditions(state, action){
            state.weatherConditions = action.payload;
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false;
        },
    },
});

export const {
    setSelectLocation,
    setWeatherConditions,
    setError
} = weatherSlice.actions;

export default weatherSlice.reducer;