import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import Chart from './chart'
import NodePanel from './node-panel'

const apiRequest = async uri => {
  const res = await fetch(uri)
  if (res.status !== 200) {
    throw new Error('TODO')
  }
  return await res.json()
}

const App = () => {
  const [charts, setCharts] = useState(null)
  const [nodes, setNodes] = useState(null)
  const loadCharts = async () => {
    const sensors = ['temperature', 'pressure', 'light', 'humidity']

    const sensorData = await Promise.all(
      sensors.map(sensor => apiRequest(`/api/${sensor}/1/1/`))
    )
    const chartData = sensors.reduce(
      (data, sensor) => ({
        ...data,
        [sensor]: sensorData[sensors.indexOf(sensor)]
      }),
      {}
    )
    console.log({ chartData })
    return chartData
  }
  const loadNodes = async () => await apiRequest(`/api/nodes`)
  const reloadData = () =>
    Promise.all([
      loadNodes().then(nodeData => setNodes(nodeData)),
      loadCharts().then(chartData => setCharts(chartData))
    ])

  useEffect(() => {
    reloadData()
  }, [])

  console.log({ nodes })
  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12, order: 1 }} lg={{ size: 9, order: 0 }}>
          {charts && (
            <>
              <Row>
                <Col xs="12" md="6">
                  <Chart
                    title="Temperature"
                    sensor="temperature"
                    min={10}
                    max={40}
                    data={charts.temperature}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Chart
                    title="Pressure"
                    sensor="pressure"
                    data={charts.pressure}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs="12" md="6">
                  <Chart title="Light" sensor="light" data={charts.light} />
                </Col>
                <Col xs="12" md="6">
                  <Chart
                    title="Humidity"
                    sensor="humidity"
                    min={0}
                    max={100}
                    data={charts.humidity}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col xs={{ size: 12, order: 0 }} lg={{ size: 3, order: 1 }}>
          <Row>
            {nodes && (
              <>
                <Col xs="12">
                  <NodePanel nodes={nodes} />
                </Col>
                <Col xs="12">
                  <div style={{ border: '1px solid red' }}>Chart Options</div>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default App
