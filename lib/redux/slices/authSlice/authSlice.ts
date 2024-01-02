// import {CounterSliceState, incrementAsync} from "@/lib/redux";
import{loadAllUser} from './thunks'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "./user";

export interface AuthShape
{
   users: User[]

}
const initialState: AuthShape = {
  users: [

  ]
   
}
export const authSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.users = action.payload;
        },
        // logout: (state) => {
        //     state.token  = undefined;
        // },

    },
    extraReducers: (builder) => {
        builder
           
            .addCase(loadAllUser.fulfilled, (state,action) => {
                console.log('Extra reducer fullfilled ',action.payload);
                state.users = action.payload;
            })
          
        ;
    
   },
    

})