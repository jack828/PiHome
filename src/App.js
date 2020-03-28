import React from 'react'
import { Container } from 'reactstrap'
import TemperatureChart from './charts/temperature'

const App = () => {
  return (
    <Container style={{ margin: '24px' }}>
      <TemperatureChart />
    </Container>
  )
}

export default App
