import { createSlice } from 'redux-starter-kit';

const initialState = {
  measurements: [],
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurements: (state, action) => {
      state.measurements = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;