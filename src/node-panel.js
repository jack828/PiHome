import React, { useState } from 'react'
import { Table, Row, Input } from 'reactstrap'
import sub from 'date-fns/sub'
import formatRelative from 'date-fns/formatRelative'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Statuses
//  - ONLINE - seen at least 30m ago
//  - WARNING - seen greater than 30m ago
//  - OFFLINE - seen greater than 1 day ago
const getStatusIcon = lastReading => {
  const date = new Date(lastReading)
  const thirtyMinAgo = sub(new Date(), { minutes: 30 })
  const oneDayAgo = sub(new Date(), { days: 1 })

  if (date < oneDayAgo) {
    return 'times'
  } else if (date < thirtyMinAgo) {
    return 'exclamation-triangle'
  } else {
    return 'check'
  }
}

const formatDuration = (start, end) => {
  const SECONDS = 1 * 1000
  const MINUTES = 60 * SECONDS
  const HOURS = 60 * MINUTES
  const DAYS = 24 * HOURS
  const duration = start - end // in ms

  const days = Math.floor(duration / DAYS)
  const hours = Math.floor((duration % DAYS) / HOURS)
  const minutes = Math.floor((duration % HOURS) / MINUTES)
  const seconds = Math.floor((duration % MINUTES) / SECONDS)

  const format = (amount, label) => `${amount > 0 ? `${amount}${label} ` : ''}`
  return (
    format(days, 'd') +
    format(hours, 'h') +
    format(minutes, 'm') +
    format(seconds, 's')
  )
}

const Node = ({
  nodeId,
  nickname,
  lastIdentified,
  lastReading,
  onChangeNickname
}) => {
  const [editMode, setEditMode] = useState(false)
  const [showUptime, setShowUptime] = useState(false)
  const displayName = nickname || nodeId
  const [editedNickname, setEditedNickname] = useState(displayName)

  return (
    <tr className="d-flex text-center">
      <th className="col-1" scope="row">
        <FontAwesomeIcon icon={getStatusIcon(lastReading)} />
      </th>
      <td className="col-4">
        {editMode ? (
          <Input
            value={editedNickname}
            onChange={({ target: { value } }) => setEditedNickname(value)}
          />
        ) : (
          displayName
        )}
      </td>
      <td
        className="col-5"
        onClick={() => setShowUptime(prevState => !prevState)}
      >
        {showUptime
          ? formatDuration(new Date(), new Date(lastIdentified))
          : formatRelative(new Date(lastReading), new Date())}
      </td>
      <td className="col-1">
        <FontAwesomeIcon icon="terminal" />
      </td>
      <td className="col-1">
        {editMode ? (
          <div
            onClick={() => {
              onChangeNickname(nodeId, editedNickname)
              setEditMode(false)
            }}
          >
            <FontAwesomeIcon icon="check" />
          </div>
        ) : (
          <div onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon="edit" />
          </div>
        )}
      </td>
    </tr>
  )
}

export default ({ nodes, onChangeNickname }) => {
  if (!nodes || !nodes.length) {
    return <h4>No Nodes!</h4>
  }
  return (
    <Row>
      <Table size="sm" dark>
        <thead>
          <tr>
            <th className="text-center">{nodes.length} Nodes</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map(node => (
            <Node
              key={node.nodeId}
              {...node}
              onChangeNickname={onChangeNickname}
            />
          ))}
        </tbody>
      </Table>
    </Row>
  )
}
