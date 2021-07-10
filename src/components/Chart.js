import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricCard'
// import { actions } from '../Features/Measurements/reducer';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  div: {
    textAlign: 'center',
    margin: '0 auto'
  },
  grid: {
    margin: '10px auto'
  }
});

const Chart = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
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
    return moment.unix(heartbeat).format('h:mmA');
  };

  // useEffect(() => {
  //   dispatch(actions.timeConvert(chartData))
  // })
  
  return (
    <>
      <Grid fluid="true" container row="true" spacing={2} className={classes.grid} alignItems="center">
        {activeMets.map((metric, idx) => {
          if (metric.metricName === 'injValveOpen') {
            let valveArr = subData.find(element => element.metric === 'injValveOpen')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={`${valveArr.unit}`} />
              </Grid>
            )
          }
          else if (metric.metricName === 'oilTemp') {
            let valveArr = subData.find(element => element.metric === 'oilTemp')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={`°${valveArr.unit}`} />
              </Grid>
            )
          }
          else if (metric.metricName === 'flareTemp') {
            let valveArr = subData.find(element => element.metric === 'flareTemp')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={`°${valveArr.unit}`} />
              </Grid>
            )
          }
          else if (metric.metricName === 'waterTemp') {
            let valveArr = subData.find(element => element.metric === 'waterTemp')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={`°${valveArr.unit}`} />
              </Grid>
            )
          }
          else if (metric.metricName === 'tubingPressure') {
            let valveArr = subData.find(element => element.metric === 'tubingPressure')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={` ${valveArr.unit}`} />
              </Grid>
            )
          }
          else if (metric.metricName === 'casingPressure') {
            let valveArr = subData.find(element => element.metric === 'casingPressure')
            return (
              <Grid item key={idx}>
                <MetricCard key={idx} metric={metric.metricName} value={valveArr.value} unit={` ${valveArr.unit}`} />
              </Grid>
            )
          }
          else {
            return null;
          }
        })}
      </Grid>
      <ResponsiveContainer height="50%" width="50%" className={classes.div}>
      <LineChart data={chartData}>
          <Legend align="right" verticalAlign="top"/>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis type='number' tickFormatter={xAxisFormatter} dataKey="at" allowDuplicatedCategory={false} minTickGap={10} domain={['dataMin', 'dataMax']} />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.map(((metric) => {   
            return (
              <Line
                name={metric.metric}
                data={metric.measurements}
                key={metric.metric}
                unit={" " + metric.measurements[0].unit}
                type="linear"
                dataKey="value"
                stroke={metric.color}
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
