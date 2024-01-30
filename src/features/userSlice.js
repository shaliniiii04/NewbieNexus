import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
      id:null,
      first_name: "",
      last_name:"",
      interests: [],
      username: "",
      email: "",
    },
    reducers: {
      setUserData: (state, action) => {
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.interests=action.payload.interests
        state.id=action.payload.id
      },
      setUserInterests: (state,action)=>{
        state.interests=action.payload
      }
    },
  });
  
  export const { setUserData,setUserInterests } = userSlice.actions;
  export default userSlice.reducer;