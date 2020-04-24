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
  }, [config.rangeKey])

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
      <h4>
        {title}
        {loading && ' - loading....'}
        {error && ` - error - ${error}`}
      </h4>
      {datasets && (
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
                connectNulls
                key={node.nodeId}
                dot={false}
                type="monotone"
                name={(config.showNicknames && node.nickname) || node.nodeId}
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

export default Chart
