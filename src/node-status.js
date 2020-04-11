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
            <tr key={nodeId}>
              <th scope="row" className="text-center">OK</th>
              <td>
                {nodeId.slice(0, 8)} {nodeId.slice(9, 17)}
              </td>
              <td>{moment(lastIdentified).fromNow()}</td>
              <td>
                <FontAwesomeIcon icon="terminal" />
              </td>
              <td>
                <FontAwesomeIcon icon="edit" />
              </td>
              <td>
                <FontAwesomeIcon icon={visible ? 'eye' : 'eye-slash'} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}
