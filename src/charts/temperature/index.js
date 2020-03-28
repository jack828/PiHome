import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'

const TemperatureChartContainer = () => {
  const [data, setData] = useState([])
  const loadData = async () => {}

  useEffect(() => {
    loadData()
  })
  return (
    <Container>
      test<h1>another test</h1>
    </Container>
  )
}

export default TemperatureChartContainer
