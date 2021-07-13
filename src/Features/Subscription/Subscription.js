import React, { useEffect, useCallback } from 'react';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const query = `
  subscription {
    newMeasurement {
      metric,
      value,
      unit,
      at
    }
  }
`;


const handleSubscription = (measurements = [], response) => {
  return [response.newMeasurement, ...measurements];
};

export default () => {
  return (
    <Provider value={client}>
      <Subscription />
    </Provider>
  );
};


const Subscription = () => {
  const dispatch = useDispatch();

  // Organizes sub data and saves to redux state
  const organizeData = useCallback(measurement => {
    const reducerSwitch = measurement => {  
      if (measurement[0].metric === 'oilTemp') {
        return dispatch(actions.oilTemp(measurement[0]));
      } else if (measurement[0].metric === 'injValveOpen') {
        return dispatch(actions.injValveOpen(measurement[0]));
      } else if (measurement[0].metric === 'flareTemp') {
        return dispatch(actions.flareTemp(measurement[0]));
      } else if (measurement[0].metric === 'waterTemp') {
        return dispatch(actions.waterTemp(measurement[0]));
      } else if (measurement[0].metric === 'casingPressure') {
        return dispatch(actions.casingPressure(measurement[0]));
      } else if (measurement[0].metric === 'tubingPressure') {
        return dispatch(actions.tubingPressure(measurement[0]));
      }
    };
    reducerSwitch(measurement)
  }, [dispatch]);
  
  const [ result ] = useSubscription({
    query,
  }, handleSubscription);
  
  const { fetching, data, error } = result;
  
  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
    if (!data) {
      return;
    }
    organizeData(data)
    dispatch(actions.getSubData(data))
  }, [data, error, dispatch, organizeData]);
  if (!fetching) return <LinearProgress />;


  return null;
};