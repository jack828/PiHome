import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

const Chart = ({ data, loadData, title, sensor, yMin, yMax, config }) => {
  const {
    loading: { [sensor]: loading },
    error: { [sensor]: error },
    data: { [sensor]: datasets }
  } = data

  useEffect(() => {
    loadData({ sensor })
  }, [])

  return (
    <div style={{ height: config.chart.height }}>
      {loading && <h4>Loading</h4>}

      {error && <h4>{title} load error</h4>}
      {datasets && !error && !loading && (
        <Line
          title="test"
          data={{
            datasets
          }}
          legend={{
            display: true,
            labels: {
              fontColor: 'white'
            }
          }}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: title,
              position: 'top',
              fontSize: 24,
              fontColor: 'white'
            },
            scales: {
              yAxes: [
                {
                  gridLines: { color: '#999' },
                  ticks: {
                    fontColor: 'white',
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
                    unit: 'minute'
                  },
                  gridLines: { color: '#999' },
                  ticks: {
                    fontColor: 'white',
                    suggestedMin: config.range.start,
                    suggestedMax: config.range.end
                  }
                }
              ]
            }
          }}
        />
      )}
    </div>
  )
}

export default Chart
