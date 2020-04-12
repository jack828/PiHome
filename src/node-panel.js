import React, { useState } from 'react'
import { Table, Col, Row, Input } from 'reactstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Statuses
//  - ONLINE - seen at least 30m ago
//  - WARNING - seen greater than 30m ago
//  - OFFLINE - seen greater than 1 day ago
// TODO this should be lastSeen
// using lastIdentified for testing
const getStatusIcon = lastIdentified => {
  const date = moment(lastIdentified)
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

const Node = ({ nodeId, nickname, lastIdentified, onChangeNickname }) => {
  const [editMode, setEditMode] = useState(false)
  const displayName = nickname || nodeId
  const [editedNickname, setEditedNickname] = useState(displayName)
  return (
    <tr className="d-flex text-center">
      <th className="col-1" scope="row">
        <FontAwesomeIcon icon={getStatusIcon(lastIdentified)} />
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
      <td className="col-5">{moment(lastIdentified).fromNow()}</td>
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
