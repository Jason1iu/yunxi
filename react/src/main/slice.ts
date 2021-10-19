
import { createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { StateKeys } from "../global";
import request from "../utils/request";
import { MainReduxState, LoginUser } from "./interface";

const stateKey = StateKeys.MAIN;

export const fetchUserInfoAsync = createAsyncThunk(
    `${stateKey}/fetchUserInfoAsync`,
    async () => {
        const userInfo: LoginUser = await request(`/api/user-info`, { method: "GET" });
        return userInfo;
    }
);

const initialState: MainReduxState = {
    loading: true,
};

const mainSlice = createSlice({
    name: stateKey,
    initialState,
    reducers: {
        updateLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addDefaultCase((state, _action) => {
                //console.log("error:", action.type)
                state.loading = false;
            });
    }
});

const { reducer, actions } = mainSlice;
export default reducer;

export const {
    updateLoading,
} = actions;
