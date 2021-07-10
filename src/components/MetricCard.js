import React from 'react'
import Card from '@material-ui/core/Card';

const MetricCard = (props) => {
  const { metric, value, unit } = props

  return (
    <div>
      <Card key={metric} style={{width: '200px', padding: '0 10px', marginTop: '10px'}}>
        <h3>{metric}:</h3>
        <h1>{value}{unit}</h1>
      </Card>
    </div>
  )
}

export default MetricCard
