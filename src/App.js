import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import moment from 'moment'
import Chart from './chart'
import NodePanel from './node-panel'
import ChartOptionsPanel from './chart-options-panel'

const api = async uri => {
  const res = await fetch(uri)
  if (res.status !== 200) {
    throw new Error('TODO')
  }
  return await res.json()
}

const createRangeOptions = () => [
  {
    name: '12 h',
    start: moment()
      .subtract(12, 'hours')
      .toISOString(),
    end: moment().toISOString()
  },
  {
    name: '24 h',
    start: moment()
      .subtract(24, 'hours')
      .toISOString(),
    end: moment().toISOString()
  },
  {
    name: '7 d',
    start: moment()
      .subtract(7, 'days')
      .toISOString(),
    end: moment().toISOString()
  },
  {
    name: '1 m',
    start: moment()
      .subtract(1, 'month')
      .toISOString(),
    end: moment().toISOString()
  }
]

const defaultChartConfig = () => {
  const rangeOptions = createRangeOptions()
  return {
    showNicknames: true,
    range: rangeOptions[1],
    rangeOptions
  }
}

const App = () => {
  const [charts, setCharts] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [chartConfig, setChartConfig] = useState(defaultChartConfig())
  const loadCharts = async (rangeOption) => {
    const sensors = ['temperature', 'pressure', 'light', 'humidity']
    const { start, end } = rangeOption || chartConfig.range

    const sensorData = await Promise.all(
      sensors.map(sensor => api(`/api/sensor/${sensor}/${start}/${end}/`))
    )
    const chartData = sensors.reduce(
      (data, sensor) => ({
        ...data,
        [sensor]: sensorData[sensors.indexOf(sensor)]
      }),
      {}
    )
    setCharts(chartData)
  }
  const loadNodes = async () => setNodes(await api(`/api/nodes`))
  const reloadData = () => Promise.all([loadNodes(), loadCharts()])

  const handleChangeNickname = async (nodeId, nickname) => {
    console.log('renaming node', nodeId, 'to', nickname)
    const res = await fetch(`/api/node/rename/${nodeId}/`, {
      method: 'POST',
      body: nickname
    })
    if (res.status !== 200) {
      throw new Error('TODO')
    }
    console.log(await res.text())
    reloadData()
  }

  useEffect(() => {
    reloadData()
  }, [])

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
                    yMin={10}
                    yMax={40}
                    data={charts.temperature}
                    config={chartConfig}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Chart
                    title="Pressure"
                    sensor="pressure"
                    data={charts.pressure}
                    config={chartConfig}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs="12" md="6">
                  <Chart
                    title="Light"
                    sensor="light"
                    data={charts.light}
                    config={chartConfig}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Chart
                    title="Humidity"
                    sensor="humidity"
                    yMin={0}
                    yMax={100}
                    data={charts.humidity}
                    config={chartConfig}
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
                  <NodePanel
                    nodes={nodes}
                    onChangeNickname={handleChangeNickname}
                  />
                </Col>
                <Col xs="12">
                  <ChartOptionsPanel
                    config={chartConfig}
                    setConfig={setChartConfig}
                    reloadCharts={loadCharts}
                  />
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
