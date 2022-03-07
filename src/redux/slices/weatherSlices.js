 import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 import axios from 'axios';

 export const fetchWeatherAction = createAsyncThunk(
        'weather/fetch',
        async (payload, {rejectWithValue, getState, dispatch})=>{
            try{
                const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=7469e38d322111e34a7027db2eee39c3`);
                console.log(data.sys.country);
                return data;
            }catch(error){
                if(!error?.response){
                    throw error
                }
                return rejectWithValue(error?.response?.data);
            }
        }
 );

    const weatherSlice = createSlice({
        name: 'weather',
        initialState: {},
        extraReducers: builder => {
            builder.addCase(fetchWeatherAction.pending, (state, action) => {
                state.loading = true;
            });
            builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
                state.weather = action?.payload;
                state.loading = false;
                state.error = undefined;
            });
            builder.addCase(fetchWeatherAction.rejected, (state, action) => {
                state.loading = false;
                state.weather = undefined;
                state.error = action?.payload;
            })
        },
    });

    export default weatherSlice.reducer;