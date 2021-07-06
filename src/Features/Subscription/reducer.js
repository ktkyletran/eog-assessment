import { createSlice } from 'redux-starter-kit';

const initialState = {
  subData: [],
};

const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    getSubData: (state, action) => {
      state.subData = action.payload
    },
  },
});


export const reducer = slice.reducer;
export const actions = slice.actions;