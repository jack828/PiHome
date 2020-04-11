import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart'

const App = () => {
  return (
    <Container fluid noGutters>
      <Row>
        <Col xs="9">
          <Row>
            <Col xs="6">
              <Chart title="Temperature" sensor="temperature" />
            </Col>
            <Col xs="6">
              <Chart title="Pressure" sensor="pressure" />
            </Col>
          </Row>

          <Row>
            <Col xs="6">
              <Chart title="Light" sensor="light" />
            </Col>
            <Col xs="6">
              <Chart title="Humidity" sensor="humidity" />
            </Col>
          </Row>
        </Col>
        <Col xs="3">
          <div style={{ border: '1px solid red' }}>test</div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
