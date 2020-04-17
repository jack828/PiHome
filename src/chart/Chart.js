import React, { useEffect } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import format from 'date-fns/format'

const Chart = ({
  nodes,
  data,
  loadData,
  title,
  sensor,
  yMin,
  yMax,
  config
}) => {
  const {
    loading: { [sensor]: loading },
    error: { [sensor]: error },
    data: { [sensor]: datasets }
  } = data

  useEffect(() => {
    loadData({ sensor })
  }, [])

  const formatData = sets => {
    let a = [
      {
        nodeId: 'A4:CF:12:26:03:9C',
        colour: '#d8d8d8',
        nickname: 'ESP32',
        data: Array(93)
      },
      {
        nodeId: 'CC:50:E3:A1:0D:80',
        colour: '#97da61',
        nickname: 'ESP32 BATTTt',
        data: Array(91)
      }
    ]
    const out = [
      {
        createdDate: new Date(),
        value: 42,
        colour: '#d8d8d8',
        label: 'ESP32 BATT OLED'
      }
    ]
    const formatted = datasets.reduce(
      (output, { data, ...node }) => [
        ...output,
        ...data.map(data => ({ ...data, [node.nodeId]: data.value }))
      ],
      []
    )
    console.log(formatted)
    return formatted
  }
  const formatTick = ({ payload: { value } }) => {
    // console.log('tickformat', value, format(new Date(value), 'HH:MM'))
    return format(new Date(value), 'HH:MM')
  }
  return (
    <div style={{ height: config.chart.height }}>
      {loading && <h4>Loading</h4>}

      {error && <h4>{title} load error</h4>}
      <h4>{title}</h4>
      {datasets && !error && !loading && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatData(datasets)}>
            <YAxis dataKey="value" />
            <XAxis dataKey="createdDate" tick={formatTick} />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            {nodes.map(node => (
              <Line
                key={node.nodeId}
                dot={false}
                type="monotone"
                stroke={node.colour}
                dataKey={node.nodeId}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
/*
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
        */
export default Chart
