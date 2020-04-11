import React, { useEffect, useState } from 'react'
import { Table, Col, Row } from 'reactstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  const loadNodes = async () => {
    const res = await fetch(`/api/nodes`)
    if (res.status !== 200) {
      return // some error
    }
    const nodes = await res.json()
    console.log(nodes)
    setNodes(nodes)
  }

  useEffect(() => {
    loadNodes()
  }, [])

  const [nodes, setNodes] = useState([])
  if (!nodes || !nodes.length) {
    return <h4>No Nodes!</h4>
  }
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
  // Statuses
  //  - ONLINE - seen at least 30m ago
  //  - WARNING - seen greater than 30m ago
  //  - OFFLINE - seen greater than 1 day ago
  return (
    <Row>
      <p>{nodes.length} nodes</p>
      <Table size="sm" dark>
        <tbody>
          {nodes.map(({ nodeId, lastIdentified, visible }) => (
            <tr key={nodeId} className="d-flex text-center">
              <th className="col-1" scope="row">
                <FontAwesomeIcon icon={getStatusIcon(lastIdentified)} />
              </th>
              <td className="col-4">
                {nodeId.slice(0, 8)} {nodeId.slice(9, 17)}
              </td>
              <td className="col-4">{moment(lastIdentified).fromNow()}</td>
              <td className="col-1">
                <FontAwesomeIcon icon="terminal" />
              </td>
              <td className="col-1">
                <FontAwesomeIcon icon="edit" />
              </td>
              <td className="col-1">
                <FontAwesomeIcon icon={visible ? 'eye' : 'eye-slash'} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}
