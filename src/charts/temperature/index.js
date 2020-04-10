import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

// TODO Toggleable node view
const formatDatasets = nodes => {
  const datasets = []

  nodes.forEach(node => {
    const data = node.data.map(({ createdDate, value }) => ({ x: new Date(createdDate), y: value }))
    datasets.push({
      fill: false,
      label: node.nodeId,
      data
    })
  })

  return datasets
}

const TemperatureChartContainer = () => {
  const loadDatasets = async () => {
    const res = await fetch('/api/temperature/1/1')
    if (res.status !== 200) {
      return // some error
    }
    const { results: nodes } = await res.json()
    console.log(nodes)
    const formattedDatasets = formatDatasets(nodes)
    console.log(formattedDatasets)
    setDatasets(formattedDatasets)
  }

  useEffect(() => {
    loadDatasets()
  }, [])

  const [datasets, setDatasets] = useState([])

  return (
    <Container>
      <h1>Temperature</h1>
      <Line
        data={{
          datasets
        }}
        legend={{ display: true }}
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
