import React from 'react'
import { connect } from 'react-redux'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart/'
import Nodes from './nodes/'
import Config from './config/'
import StatusPanel from './status-panel/'

const App = ({ sensors }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12, order: 0 }} lg={{ size: 9, order: 0 }}>
          <StatusPanel />
        </Col>
        <Col xs={{ size: 12, order: 2 }} lg={{ size: 9, order: 1 }}>
          <Row>
            <Col xs="12" md="6">
              <Chart sensor="temperature" {...sensors[0]} />
            </Col>
            <Col xs="12" md="6">
              <Chart sensor="pressure" {...sensors[1]} />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Chart sensor="humidity" {...sensors[2]} />
            </Col>
            <Col xs="12" md="6">
              <Chart sensor="airQuality" {...sensors[3]} />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Chart sensor="light" {...sensors[4]} />
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

const mapStateToProps = ({ data }) => ({
  sensors: data.get('sensors').toJS()
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
