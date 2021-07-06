import React, { useEffect } from 'react';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SubscriptionClient } from 'subscriptions-transport-ws';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
// import MetricCard from '../../components/MetricCard';
// import Grid from '@material-ui/core/Grid';

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
    dispatch(actions.getSubData(data.slice(0, 6)))
  }, [data, error, dispatch]);
  if (!fetching) return <LinearProgress />;


  return null;
};