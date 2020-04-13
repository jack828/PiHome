import React, { useState } from 'react'
import { Input } from 'reactstrap'
import formatRelative from 'date-fns/formatRelative'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sub from 'date-fns/sub'

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
  colour,
  lastIdentified,
  lastReading,
  onChangeNickname,
  onChangeColour
}) => {
  const [editMode, setEditMode] = useState(false)
  const [showUptime, setShowUptime] = useState(false)
  const displayName = nickname || nodeId
  const [editedNickname, setEditedNickname] = useState(displayName)
  const [editedColour, setEditedColour] = useState(colour)
  // TODO this makes more sense as embellished info
  const statusIcon = getStatusIcon(lastReading)

  return (
    <tr className="d-flex text-center">
      {editMode ? (
        <>
          <th className="col-1" scope="row">
            <FontAwesomeIcon icon={statusIcon} />
          </th>
          <td className="col-4">
            <Input
              value={editedNickname}
              onChange={({ target: { value } }) => setEditedNickname(value)}
            />
          </td>
          <td className="col-5">
            <Input
              value={editedColour}
              onChange={({ target: { value } }) => setEditedColour(value)}
            />
          </td>
          <td className="col-1">
            <FontAwesomeIcon icon="terminal" />
          </td>
          <td className="col-1">
            <div
              onClick={() => {
                onChangeNickname(nodeId, editedNickname)
                onChangeColour(nodeId, editedColour)
                setEditMode(false)
              }}
            >
              <FontAwesomeIcon icon="check" />
            </div>
          </td>
        </>
      ) : (
        <>
          <th className="col-1" scope="row">
            <FontAwesomeIcon icon={statusIcon} />
          </th>
          <td className="col-4">displayName</td>
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
            <div onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon="edit" />
            </div>
          </td>
        </>
      )}
    </tr>
  )
}

export default Node
