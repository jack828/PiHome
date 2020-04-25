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
            style={{
              border: '1px solid #d8d8d8',
              textAlign: 'center'
            }}
            key={`Status-Node-${nodeId.replace(/:/g, '')}`}
          >
            {(config.showNicknames && nickname) || nodeId}
            <Row
              style={
                {
                  // border: '1px solid #dfdfdf'
                }
              }
            >
              {readings.map(({ value, sensor: { name, unit, precision } }) => (
                <Col
                  key={`Status-Node-${nodeId.replace(/:/g, '')}-sensor-${name}`}
                  xs="12"
                  md="6"
                  style={
                    {
                      // border: '1px solid #dfdfdf',
                    }
                  }
                >
                  <h3>
                    {Number(value).toFixed(precision)}
                    {unit}
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
