import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart/'
import Nodes from './nodes/'
import Config from './config/'
import StatusPanel from './status-panel/'

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12, order: 0 }} lg={{ size: 9, order: 0 }}>
          <StatusPanel />
        </Col>
        <Col xs={{ size: 12, order: 2 }} lg={{ size: 9, order: 1 }}>
          <Row>
            <Col xs="12" md="6">
              <Chart
                title="Temperature"
                sensor="temperature"
                yMin={20}
                yMax={30}
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
              <Chart title="Humidity" sensor="humidity" yMin={0} yMax={100} />
            </Col>
          </Row>
        </Col>
        <Col xs={{ size: 12, order: 1 }} lg={{ size: 3, order: 2 }}>
          <Row>
            <Col xs="12">
              <Nodes />
            </Col>
            <Col xs="12">
              <Config />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default App
