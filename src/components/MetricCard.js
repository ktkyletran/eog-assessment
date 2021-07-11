import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '200px',
    padding: '0 10px'
  },
});

const MetricCard = (props) => {
  const { metric, value, unit } = props
  const classes = useStyles();

  return (
    <div>
      <Card key={metric} className={classes.card}>
        <h3>{metric}:</h3>
        <h1>{value}{unit}</h1>
      </Card>
    </div>
  )
}

export default MetricCard
