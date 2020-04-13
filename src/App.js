import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import sub from 'date-fns/sub'
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
    start: sub(new Date(), { hours: 12 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '24 h',
    start: sub(new Date(), { hours: 24 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '7 d',
    start: sub(new Date(), { days: 7 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '1 m',
    start: sub(new Date(), { months: 1 }).toISOString(),
    end: new Date().toISOString()
  }
]

const defaultChartConfig = () => {
  const rangeOptions = createRangeOptions()
  return {
    showNicknames: true,
    range: rangeOptions[1],
    rangeOptions,
    chart: {
      height: '350px'
    }
  }
}

const App = () => {
  const [charts, setCharts] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [chartConfig, setChartConfig] = useState(defaultChartConfig())
  const loadCharts = async rangeOption => {
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

  const handleSaveNode = async data => {
    console.log('updating node', data)
    const res = await fetch('/api/node', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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
                    yMin={20}
                    yMax={34}
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
                  <NodePanel nodes={nodes} onSave={handleSaveNode} />
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
