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
});

const Chart = () => {
  const classes = useStyles();
  const subData = useSelector(state => state.subscription.subData);
  const activeMets = useSelector(state => state.metrics.activeMetrics);
  const measurementData = useSelector(state => state.measurements.measurements);

  const dataFilter = data => {
    for (let i = 0; i < activeMets.length; i++) {
      if (data.metric === activeMets[i].metricName) {
        return true;
      };
    };
  };
  
  const chartData = measurementData.filter(dataFilter)
  
  let xAxisFormatter = heartbeat => {
    const start = moment.unix(heartbeat);
    const remainder = 60 - (start.minute() % 60);

    return moment.unix(heartbeat).add(remainder, "minutes").format('h:mmA');
    // return moment.unix(heartbeat).format('h:mmA');
  };

  const assignColor = metric => {
    if (metric === 'injValveOpen') {
      return "red"
    }
    else if (metric === 'oilTemp') {
      return "blue"
    }
    else if (metric === 'waterTemp') {
      return "orange"
    }
    else if (metric === 'flareTemp') {
      return "green"
    }
    else if (metric === 'casingPressure') {
      return "hotpink"
    }
    else if (metric === 'tubingPressure') {
      return "purple"
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
      <LineChart data={chartData}>
          <Legend align="right" verticalAlign="top"/>
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis type='number' tickFormatter={xAxisFormatter} dataKey="at" allowDuplicatedCategory={true} domain={['dataMin', 'dataMax']} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {chartData.map(((metric) => {  
            return (
              <Line
                name={metric.metric}
                data={metric.measurements}
                key={metric.metric}
                unit={" " + metric.measurements[0].unit}
                type="linear"
                dataKey="value"
                stroke={assignColor(metric.metric)}
                dot={false}
                />
            )
          }))}
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart
