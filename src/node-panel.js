import React from 'react'
import { Table, Row } from 'reactstrap'
import Node from './node'

export default ({ nodes, onChangeNickname, onChangeColour }) => {
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
              onChangeColour={onChangeColour}
            />
          ))}
        </tbody>
      </Table>
    </Row>
  )
}
