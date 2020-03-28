import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const TemperatureChartContainer = () => {
  const loadData = async () => {}

  const d = s =>
    moment()
      .add(s, 'minutes')
      .toDate()

  useEffect(() => {
    loadData()
  })
  const data = [{ x: d(0), y: 10 }, { x: d(1), y: 13 }, { x: d(2), y: 12 }]

  return (
    <Container>
      <h1>Temperature</h1>
      <Line
        data={{
          datasets: [
            {
              data,
              fill: false
            }
          ]
        }}
        legend={{ display: false }}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'series'
                // time: {
                // unit: 'minute'
                // }
              }
            ]
          }
        }}
      />
    </Container>
  )
}

export default TemperatureChartContainer
