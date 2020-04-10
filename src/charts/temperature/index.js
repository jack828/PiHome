import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const formatData = raw =>
  raw.map(({ createdDate, value }) => ({ x: new Date(createdDate), y: value }))

const TemperatureChartContainer = () => {
  const loadData = async () => {
    const res = await fetch('/api/temperature/1/1')
    if (res.status !== 200) {
      return // some error
    }
    const { results: rawData } = await res.json()
    console.log(rawData)
    const formattedData = formatData(rawData)
    console.log(formattedData)
    setData(formattedData)
  }

  const d = s =>
    moment()
      .add(s, 'minutes')
      .toDate()

  useEffect(() => {
    loadData()
  }, [])

  const [data, setData] = useState([
    { x: d(0), y: 10 },
    { x: d(1), y: 13 },
    { x: d(2), y: 12 }
  ])

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
