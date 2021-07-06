import React, { useEffect } from 'react';
import { actions } from './reducer';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  heartBeat
}
`;

export default () => {
  return (
    <Provider value={client}>
      <HeartBeat />
    </Provider>
  );
};

const HeartBeat = () => {
  const dispatch = useDispatch();

  const [results] = useQuery({
    query,
  });

  const { fetching, data, error } = results;

  useEffect(() => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (!data) return;
    const { heartBeat } = data;
    dispatch(actions.getHeartBeat(heartBeat));
  }, [data, dispatch, error])
  
  if (fetching) return <LinearProgress />;

  return null;
}