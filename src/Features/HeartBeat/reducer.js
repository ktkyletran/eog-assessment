import { createSlice } from 'redux-starter-kit';

const initialState = {
  heartBeat: 0,
};

const slice = createSlice({
  name: 'heartBeat',
  initialState,
  reducers: {
    getHeartBeat: (state, action) => {
      state.heartBeat = action.payload
    },
  },
});


export const reducer = slice.reducer;
export const actions = slice.actions;