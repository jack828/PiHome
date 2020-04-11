import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'reactstrap'

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
  return <p>hello, {nodes.length} nodes</p>
}
