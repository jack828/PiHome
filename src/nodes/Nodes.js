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
      <Table size="sm" dark>
        <thead>
          <tr>
            <th className="text-center">
              {error && <h4>{error}</h4>}
              {loading && (
              <FontAwesomeIcon
                icon="sync"
                spin
                fixedWidth
                pull="left"
                className="pull-xs-left"
                style={{
                  height: '-webkit-fill-available',
                  verticalAlign: 'middle',
                  marginLeft: '14px'
                }}
              />
              )}
              {!nodes || nodes.length === 0 ? (
                <>
                  <FontAwesomeIcon icon="exclamation-triangle" /> No connected
                  nodes! <FontAwesomeIcon icon="exclamation-triangle" />
                </>
              ) : (
                <>{nodes.length} Nodes</>
              )}
            </th>
          </tr>
        </thead>
        {Array.isArray(nodes) && nodes.length > 0 && (
          <tbody>
            {nodes.map(node => (
              <Node key={node.nodeId} data={node} />
            ))}
          </tbody>
        )}
      </Table>
    </Row>
  )
}

export default Nodes
