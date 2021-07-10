import { createSlice } from 'redux-starter-kit';
// import moment from 'moment'

const initialState = {
  measurements: [],
  // time: []
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurements: (state, action) => {
      state.measurements = action.payload;
    },
    // timeConvert: (state, action) => {
    //   state.time = action.payload.forEach(measurement => {
    //     return moment.unix(measurement.measurements[0].at).format('h:mmA');
    //   });
    // },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;