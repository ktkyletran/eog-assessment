import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  div: {
    textAlign: 'center',
    margin: '1% auto'
  },
  message: {
    fontSize: '35px',
    margin: '15% auto',
  }
});

const Chart = () => {
  const classes = useStyles();
  
  // Redux State
  const subData = useSelector(state => state.subscription.subData);
  const injValveOpen = useSelector(state => state.subscription.injValveOpen);
  const oilTemp = useSelector(state => state.subscription.oilTemp);
  const waterTemp = useSelector(state => state.subscription.waterTemp);
  const flareTemp = useSelector(state => state.subscription.flareTemp);
  const casingPressure = useSelector(state => state.subscription.casingPressure);
  const tubingPressure = useSelector(state => state.subscription.tubingPressure);
  const activeMets = useSelector(state => state.metrics.activeMetrics);
  const measurementData = useSelector(state => state.measurements.measurements);
  
  // Filters data based on active metrics
  const dataFilter = data => {
    for (let i = 0; i < activeMets.length; i++) {
      if (data.metric === activeMets[i].metricName) {
        return true;
      };
    };
  };

  const chartData = measurementData.filter(dataFilter)

  // Formats ticks on x axis
  let xAxisFormatter = heartbeat => {
    const start = moment.unix(heartbeat);
    const remainder = 5 - (start.minute() % 5);

    return moment.unix(heartbeat).add(remainder, "minutes").format('h:mmA');
  };

  // Assigns color to chart lines
  const assignColor = metric => {
    switch (metric) {
      case 'injValveOpen':
        return "red"
      case 'oilTemp':
        return "blue"
      case 'waterTemp':
        return "orange"
      case 'flareTemp':
        return "green"
      case 'casingPressure':
        return "hotpink"
      case 'tubingPressure':
        return "purple"
      default:
        return null;
    }
  };

  // Concats live data with historical data
  const joinData = (data, metricName) => {
    switch (metricName) {
      case 'injValveOpen':
        return data.concat(injValveOpen)
      case 'oilTemp':
        return data.concat(oilTemp)
      case 'waterTemp':
        return data.concat(waterTemp)
      case 'flareTemp':
        return data.concat(flareTemp)
      case 'casingPressure':
        return data.concat(casingPressure)
      case 'tubingPressure':
        return data.concat(tubingPressure)
      default:
        return null;
    }
  };

  // Conditional rendering for chart
  const renderChart = () => {
    if (chartData.length > 0) {
      return (
        <LineChart>
        <Legend align="right" verticalAlign="top"/>
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis type='number' tickFormatter={xAxisFormatter} dataKey="at" allowDuplicatedCategory={false} domain={['dataMin', 'dataMax']} tickMargin={5}/>
        <YAxis/>
        <Tooltip />
        {/* <Legend /> */}
        {chartData.map(((metric) => {
          return (
            <Line
              name={metric.metric}
              data={joinData(metric.measurements, metric.metric)}
              key={metric.metric}
              unit={" " + metric.measurements[0].unit}
              type="linear"
              dataKey="value"
              stroke={assignColor(metric.metric)}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              />
          )
        }))}
      </LineChart>
      )
    } else {
      return (
        <h1 className={classes.message}>Select a metric to get started</h1>
      )
    }
  }
  
  return (
    <>
      <Grid fluid="true" container row="true" spacing={2} alignItems="center" justifyContent="center" className={classes.div}>
        {activeMets.map((metric, idx) => {
          if (metric.metricName === 'injValveOpen') {
            try {
              let metricArr = subData.find(element => element.metric === 'injValveOpen')
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={`${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else if (metric.metricName === 'oilTemp') {
            let metricArr = subData.find(element => element.metric === 'oilTemp')
            try {
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={`°${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else if (metric.metricName === 'flareTemp') {
            let metricArr = subData.find(element => element.metric === 'flareTemp')
            try {
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={`°${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else if (metric.metricName === 'waterTemp') {
            let metricArr = subData.find(element => element.metric === 'waterTemp')
            try {
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={`°${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else if (metric.metricName === 'tubingPressure') {
            let metricArr = subData.find(element => element.metric === 'tubingPressure')
            try {
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={` ${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else if (metric.metricName === 'casingPressure') {
            let metricArr = subData.find(element => element.metric === 'casingPressure')
            try {
              return (
                <Grid item key={idx}>
                  <MetricCard key={idx} metric={metric.metricName} value={metricArr.value} unit={` ${metricArr.unit}`} />
                </Grid>
              )
            }
            catch {
              return null;
            }
          }
          else {
            return null;
          }
        })}
      </Grid>
      <ResponsiveContainer height="65%" width="65%" className={classes.div}>
        {renderChart()}
      </ResponsiveContainer>
    </>
  )
}

export default Chart
