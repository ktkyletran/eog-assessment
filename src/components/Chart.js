import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  div: {
    textAlign: 'center',
    margin: '0 auto'
  },
});

const Chart = () => {
  const classes = useStyles();
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
  
  return (
    <>
      <ResponsiveContainer height="50%" width="50%" className={classes.div}>
      <LineChart data={chartData}>
          <Legend align="right" verticalAlign="top"/>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis type='category' tickFormatter={xAxisFormatter} dataKey="at" allowDuplicatedCategory={false} minTickGap={25}/>
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
                activeDot={{ r: 4 }}
                />
            )
          }))}
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart
