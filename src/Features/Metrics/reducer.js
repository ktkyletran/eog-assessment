import { createSlice } from 'redux-starter-kit';

const initialState = {
  metrics: [],
  activeMetrics: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetricData: (state, action) => {
      state.metrics = action.payload
    },
    activeMetrics: (state, action) => {
      state.activeMetrics = [...state.activeMetrics, action.payload]
    },
    removeMetrics: (state, action) => {
      state.activeMetrics = state.activeMetrics.filter(metric => metric.metricName !== action.payload)
    }
  },
});


export const reducer = slice.reducer;
export const actions = slice.actions;