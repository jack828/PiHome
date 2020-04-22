import React, { useEffect } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
  const formatTick = value => {
    // console.log('tickformat', value, format(new Date(value), 'HH:MM'))
    return format(new Date(value), 'HH:mm')
  }
  const CustomTick = ({ x, y, stroke, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {formatTick(payload.value)}
      </text>
    </g>
  )

  return (
    <div style={{ height: `${config.chart.height + 50}px` }}>
      {loading && <h4>Loading</h4>}

      {error && <h4>{title} load error</h4>}
      <h4>{title}</h4>
      {datasets && !error && !loading && (
        <ResponsiveContainer width="100%" height={config.chart.height}>
          <LineChart data={datasets} margin={{ bottom: 36 }}>
            <YAxis
              type="number"
              allowDecimals={false}
              width={50}
              dataKey="value"
              domain={['auto', 'auto']}
            />
            <XAxis
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              dataKey="createdDate"
              tick={CustomTick}
              tickFormatter={formatTick}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign="top" height={36} />
            {nodes.map(node => (
              <Line
                key={node.nodeId}
                dot={false}
                type="monotone"
                name={(config.showNicknames && node.nickname) ?? node.nodeId}
                stroke={node.colour}
                strokeWidth={2}
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
