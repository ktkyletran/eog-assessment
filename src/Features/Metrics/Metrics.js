import React, { useEffect, useState } from 'react';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({
  div: {
    textAlign: 'center',
    margin: '0 auto',
  },
});


const Metrics = () => {
  const dispatch = useDispatch();
  const activeMets = useSelector(state => state.metrics.activeMetrics)
  const classes = useStyles();

  const [buttonState, setButtonState] = useState({
    injValve: false,
    oilTemp: false,
    flareTemp: false,
    waterTemp: false,
    tubingPressure: false,
    casingPressure: false,
  });

  const handleChange = name => event => {
    const metric = event.target.value;
    const isActive = event.target.checked;
    setButtonState({ ...buttonState, [name]: event.target.checked });

    if (isActive) {
      dispatch(
        actions.activeMetrics({
          metricName: metric,
        }),
      );
    } else {
      const metricIndex = activeMets.find(element => element.metricName === metric);
      dispatch(actions.removeMetrics(metricIndex.metricName));
    }
  };

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
  
  return (
    <div className={classes.div}>
      <h1 className="center">Metric(s):</h1>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>

          <FormControlLabel
            value="top"
            control={
              <Switch
                checked={buttonState.injValve}
                onChange={handleChange('injValve')}
                value="injValveOpen"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Inj Valve Open"
            labelPlacement="top"
          />

          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={buttonState.oilTemp}
                onChange={handleChange('oilTemp')}
                value="oilTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Oil Temp"
            labelPlacement="top"
          />

          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={buttonState.flareTemp}
                onChange={handleChange('flareTemp')}
                value="flareTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Flare Temp"
            labelPlacement="top"
          />
                      
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={buttonState.waterTemp}
                onChange={handleChange('waterTemp')}
                value="waterTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Water Temp"
            labelPlacement="top"
          />

          <FormControlLabel
            value="bottom"
            control={
              <Switch
                checked={buttonState.tubingPressure}
                onChange={handleChange('tubingPressure')}
                value="tubingPressure"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Tubing Pressure"
            labelPlacement="top"
          />

          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={buttonState.casingPressure}
                onChange={handleChange('casingPressure')}
                value="casingPressure"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Casing Pressure"
            labelPlacement="top"
          />

        </FormGroup>
      </FormControl>
    </div>
  );
}