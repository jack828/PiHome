import React, { useEffect } from 'react'
import { Table, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Node from '../node'

const Nodes = ({ node: { loading, error, nodes }, loadNodes }) => {
  useEffect(() => {
    loadNodes()
  }, [])

  return (
    <Row>
      {loading && <h4>loading</h4>}
      {error && <h4>Error</h4>}
      {!loading && !error && (
        <Table size="sm" dark>
          <thead>
            <tr>
              {nodes.length === 0 ? (
                <th className="text-center">
                  <FontAwesomeIcon icon="exclamation-triangle" /> No connected
                  nodes! <FontAwesomeIcon icon="exclamation-triangle" />
                </th>
              ) : (
                <th className="text-center">{nodes.length} Nodes</th>
              )}
            </tr>
          </thead>
          {nodes.length > 0 && (
            <tbody>
              {nodes.map(node => (
                <Node
                  key={node.nodeId}
                  data={node}
                />
              ))}
            </tbody>
          )}
        </Table>
      )}
    </Row>
  )
}

export default Nodes
