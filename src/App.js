import React from 'react'
import { Container } from 'reactstrap'
import Chart from './chart'

const App = () => {
  return (
    <Container style={{ margin: '24px' }}>
      <Chart title="Temperature" sensor="temperature" />
    </Container>
  )
}

export default App
