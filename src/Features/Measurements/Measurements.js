import React, { useEffect } from 'react';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
        measurements {
          metric,
          at,
          value,
          unit
      }
    }                                                                                       
  }
`;

export default () => {
  return (
    <Provider value={client}>
      <Measurements />
    </Provider>
  );
};

const Measurements = () => {
  const dispatch = useDispatch();
  const metricsList = useSelector(state => state.metrics.metrics)
  const heartBeat = useSelector(state => state.heartBeat.heartBeat)

  const queryInput = metricsList.map(metric => {
    return {
      metricName: metric,
      before: heartBeat,
      after: heartBeat - 180000
    }
  })
  const [results] = useQuery({
    query,
    variables: {
      input: queryInput
    }
  });

  const { fetching, data, error } = results;
  useEffect(() => {
    if (error) {
      console.log(error.message)
      return;
    }
    if (!data) return;
    
  const { getMultipleMeasurements } = data;
  dispatch(actions.measurements(getMultipleMeasurements))

  }, [data, dispatch, error])
  
  if (fetching) return <LinearProgress />;

  return null;
}