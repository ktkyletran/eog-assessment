import { createSlice } from 'redux-starter-kit';

const initialState = {
  subData: [],
  injValveOpen: [],
  oilTemp: [],
  waterTemp: [],
  flareTemp: [],
  casingPressure: [],
  tubingPressure: [],
};

const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    getSubData: (state, action) => {
      state.subData = action.payload
    },
    injValveOpen: (state, action) => {
      state.injValveOpen = [action.payload, ...state.injValveOpen]
    },
    oilTemp: (state, action) => {
      state.oilTemp = [action.payload, ...state.oilTemp]
    },
    waterTemp: (state, action) => {
      state.waterTemp = [action.payload, ...state.waterTemp]
    },
    flareTemp: (state, action) => {
      state.flareTemp = [action.payload, ...state.flareTemp]
    },
    casingPressure: (state, action) => {
      state.casingPressure = [action.payload, ...state.casingPressure]
    },
    tubingPressure: (state, action) => {
      state.tubingPressure = [action.payload, ...state.tubingPressure]
    },
  },
});


export const reducer = slice.reducer;
export const actions = slice.actions;