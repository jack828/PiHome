import React, { useState } from 'react'
import { Table, Row, Input } from 'reactstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Statuses
//  - ONLINE - seen at least 30m ago
//  - WARNING - seen greater than 30m ago
//  - OFFLINE - seen greater than 1 day ago
const getStatusIcon = lastReading => {
  const date = moment(lastReading)
  const thirtyMinAgo = moment().subtract(30, 'minutes')
  const oneDayAgo = moment().subtract(1, 'day')

  if (date.isBefore(oneDayAgo)) {
    return 'times'
  } else if (date.isBefore(thirtyMinAgo)) {
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
  const duration = moment().diff(end) // in ms

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
          ? formatDuration(moment(), lastIdentified)
          : moment(lastReading).fromNow()}
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
      <p>{nodes.length} nodes</p>
      <Table size="sm" dark>
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
