import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart'
import NodeStatus from './node-status'

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12, order: 1 }} lg={{ size: 9, order: 0 }}>
          <Row>
            <Col xs="12" md="6">
              <Chart
                title="Temperature"
                sensor="temperature"
                min={10}
                max={40}
              />
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
        <Col xs={{ size: 12, order: 0 }} lg={{ size: 3, order: 1 }}>
          <Row>
            <Col xs="12" md="6">
              <div style={{ border: '1px solid red' }}>
                <NodeStatus />
              </div>
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
