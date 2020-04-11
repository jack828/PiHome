import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

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

const ChartContainer = ({ title, sensor, min, max }) => {
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
    <>
      <h1>{title}</h1>
      <Line
        data={{
          datasets
        }}
        legend={{ display: true }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: min,
                  suggestedMax: max
                }
              }
            ],
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
    </>
  )
}

export default ChartContainer
