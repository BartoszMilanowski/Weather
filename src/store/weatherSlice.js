import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLocation: null,
    weatherCondition: null,
    cityName: null,
    lastUpdate: null,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setWeatherConditions(state, action){
            state.weatherCondition = action.payload;
        },
        setCityName(state, action) {
            state.cityName = action.payload;
        },
        setLastUpdate(state, action) {
            state.lastUpdate = action.payload;
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false;
        },
    },
});

export const {
    setCurrentLocation,
    setWeatherConditions,
    setCityName,
    setLastUpdate,
    setError
} = weatherSlice.actions;

export default weatherSlice.reducer;