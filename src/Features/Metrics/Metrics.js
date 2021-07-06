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
  getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
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

    const { getMetrics } = data;
    dispatch(actions.getMetricData(getMetrics));

  }, [data, dispatch, error])
  
  if (fetching) return <LinearProgress />;
  
  return null;
  //   <Grid container spacing={1}>
  //     <Grid container item>        
  //       <FormControl component="fieldset">
  //       <h1>Metrics List:</h1>
  //         <FormGroup>            
  //           {metricsArr.map((metric, idx) => {
  //             return (
  //               <FormControlLabel
  //               control={
  //                 <Switch 
  //                   checked={buttonState[metric]}
  //                   color="primary" 
  //                   onChange={handleChange(metric)}
  //                   value={metric}
  //                 />
  //               }
  //               label={metric}
  //               key={idx}
  //               />
  //               )
  //             })}
  //         </FormGroup>
  //       </FormControl>
  //     </Grid>
  //   </Grid>
  // );
}