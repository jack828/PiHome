import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart'

const App = () => {
  return (
    <Container fluid noGutters>
      <Row>
        <Col md="12" lg="9">
          <Row>
            <Col xs="12" md="6">
              <Chart title="Temperature" sensor="temperature" min={10} max={40} />
            </Col>
            <Col xs="12" md="6">
              <Chart title="Pressure" sensor="pressure" />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Chart title="Light" sensor="light" />
            </Col>
            <Col xs="12" md="6">
              <Chart title="Humidity" sensor="humidity" min={0} max={100} />
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="3">
          <Row>
            <Col xs="12" md="6">
              <div style={{ border: '1px solid red' }}>Node Status</div>
            </Col>
            <Col xs="12" md="6">
              <div style={{ border: '1px solid red' }}>Chart Options</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default App
