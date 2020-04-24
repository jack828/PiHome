import React from 'react'
import { Col, Row } from 'reactstrap'

const StatusPanel = ({ nodes, sensors, config }) => {
  if (!nodes || !sensors) return null
  // TODO indicator that it's OLD data
  return (
    <Row>
      {nodes.map(({ nodeId, nickname, recentReadings }) => {
        const readings = sensors
          .map(sensor => ({
            ...recentReadings[sensor.name],
            sensor
          }))
          .filter(({ value }) => !isNaN(value))

        return (
          <Col
            style={{ border: '1px solid pink' }}
            key={`Status-Node-${nodeId.replace(/:/g, '')}`}
          >
            {(config.showNicknames && nickname) || nodeId}
            <Row
              style={{
                border: '1px solid red'
              }}
            >
              {readings.map(reading => (
                <Col
                  xs="6"
                  style={{
                    border: '1px solid green',
                    textAlign: 'center'
                  }}
                >
                  <h3>
                    {Number(reading.value).toFixed(0)}
                    {reading.sensor.unit}
                  </h3>
                </Col>
              ))}
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}

export default StatusPanel
