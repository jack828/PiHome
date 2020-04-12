import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

// TODO Toggleable node view
const formatDatasets = (config, nodes) => {
  const { showNicknames } = config
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
      label: (showNicknames && node.nickname) || node.nodeId,
      data
    })
  })

  return datasets
}

const ChartContainer = ({ title, sensor, data, yMin, yMax, config }) => {
  const [datasets, setDatasets] = useState([])

  const loadDatasets = () => {
    setDatasets(formatDatasets(config, data))
  }

  useEffect(() => {
    loadDatasets()
  }, [data, config])

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
                  suggestedMin: yMin,
                  suggestedMax: yMax
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
