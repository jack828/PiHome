import React from 'react'
import { Container } from 'reactstrap'
import Chart from './chart'

const App = () => {
  return (
    <Container style={{ margin: '24px' }}>
      <Chart title="Temperature" sensor="temperature" />
      <Chart title="Pressure" sensor="pressure" />
      <Chart title="Light" sensor="light" />
      <Chart title="Humidity" sensor="humidity" />
    </Container>
  )
}

export default App
