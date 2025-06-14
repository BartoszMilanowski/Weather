import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLocation: null,
    cityName: null,
    lastUpdate: null,
    loading: false,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setCityName(state, action) {
            state.cityName = action.payload;
        },
        setLastUpdate(state, action) {
            state.lastUpdate = action.payload;
        },
        setLoading(state, action) {
            console.log('Updating loading state to:', action.payload)
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false;
        },
    },
});

export const {
    setCurrentLocation,
    setCityName,
    setLastUpdate,
    setLoading,
    setError
} = weatherSlice.actions;

export default weatherSlice.reducer;