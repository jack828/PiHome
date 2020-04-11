import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart'

const App = () => {
  return (
    <Container style={{ margin: '24px' }}>
      <Row>
        <Col xs="6">
          <Chart title="Temperature" sensor="temperature" />
        </Col>
        <Col xs="6">
          <Chart title="Pressure" sensor="pressure" />
        </Col>
        <Col xs="6">
          <Chart title="Light" sensor="light" />
        </Col>
        <Col xs="6">
          <Chart title="Humidity" sensor="humidity" />
        </Col>
      </Row>
    </Container>
  )
}

export default App
