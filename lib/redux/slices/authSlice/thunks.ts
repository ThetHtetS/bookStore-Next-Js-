import {createAppAsyncThunk} from "@/lib/redux/createAppAsyncThunk";
//import {fetchAllMovie} from "@/lib/redux/slices/movieSlice/movieApi";
import {authSlice} from "@/lib/redux";
import {getAllUser, getLengthApi, login, register} from "@/lib/redux/slices/authSlice/api";

export const loginAsync = createAppAsyncThunk(
    'auth/login',
    async (user:any,thunkApi) => {
        let userResponse;
        try {

            userResponse = await login(user);
            console.log(userResponse);
            
            if(userResponse.status == 200)
            {
                thunkApi.dispatch(authSlice.actions.login(userResponse.data));
                window.localStorage.setItem("token", userResponse.data.token)
                localStorage.setItem("Uid",userResponse.data._id)
                localStorage.setItem("username",userResponse.data.username)
                 
            }
        }
        catch(e)
        {
            console.log('Error case ',e.response);
            return thunkApi.rejectWithValue(e.response.data);
        }

        return userResponse.data;
    }
    );


export const RegisterAsync = createAppAsyncThunk(
    'auth/register',
    async (user:any,thunkApi) => {
        let userResponse;
        try {

            userResponse = await register(user);
            if(userResponse.status == 200)
            {
                thunkApi.dispatch(authSlice.actions.login(userResponse.data));
                console.log("user response",userResponse);
                localStorage.setItem("token", userResponse.data.token)
                localStorage.setItem("Uid", userResponse.data._id)
                localStorage.setItem("username", userResponse.data.username)
                console.log("thunk ",userResponse.data);
                
            }
            else{
              //  console.log("catch error",userResponse.data);
             ;
            
             return thunkApi.rejectWithValue(userResponse.data);
            }
        }
        catch(e)
        {
           
            
           
        }

       // return userResponse.data;
    }
    );


export const loadAllUser = createAppAsyncThunk(
    'auth/loadAllUser',
    async ()=>{
        let users = await getAllUser();
        return users;
    }   
); 


export const getLength = createAppAsyncThunk(
    'auth/getLength',
    async ()=>{
        let length = await getLengthApi();
        return length;
    }   
); 




