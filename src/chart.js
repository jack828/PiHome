import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

// TODO Toggleable node view
const formatDatasets = nodes => {
  const datasets = []

  nodes.forEach(node => {
    const data = node.data.map(({ createdDate, value }) => ({
      x: new Date(createdDate),
      y: value
    }))
    datasets.push({
      fill: false,
      showLine: true,
      pointRadius: 1,
      backgroundColor: node.colour,
      borderColor: node.colour,
      pointStyle: 'line',
      label: node.nodeId,
      data
    })
  })

  return datasets
}

const ChartContainer = ({ title, sensor }) => {
  const loadDatasets = async () => {
    const res = await fetch(`/api/${sensor}/1/1`)
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
    <Container style={{ width: '800px' }}>
      <h1>{title}</h1>
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
                distribution: 'series',
                time: {
                  displayFormat: 'HH:mm',
                  unit: 'minute'
                }
              }
            ]
          }
        }}
      />
    </Container>
  )
}

export default ChartContainer
