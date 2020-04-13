import React, { useState } from 'react'
import { Table, Col, Row, Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ config, setConfig, reloadCharts }) => {
  const toggle = property => {
    setConfig(prevState => ({ ...prevState, [property]: !prevState[property] }))
  }
  const setRangeOption = option => {
    setConfig(prevState => ({
      ...prevState,
      range: {
        ...prevState.range,
        ...option
      }
    }))
    reloadCharts(option)
  }
  return (
    <Row>
      <Table size="sm" dark>
        <thead>
          <tr>
            <th className="text-center">Chart Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="d-flex text-center"
            onClick={() => toggle('showNicknames')}
          >
            <th className="col-1" scope="row">
              <FontAwesomeIcon
                icon={config.showNicknames ? 'eye' : 'eye-slash'}
              />
            </th>
            <td className="col-11">Toggle nicknames</td>
          </tr>
          <tr className="d-flex text-center">
            <th className="col-1" scope="row">
              <FontAwesomeIcon icon="calendar-day" />
            </th>
            <td className="col-4">Date range</td>
            <td className="col-7 d-flex">
              <ButtonGroup size="sm" className="w-100">
                {config.rangeOptions.map(option => (
                  <Button
                    className="w-100"
                    key={option.name}
                    active={config.range.name === option.name}
                    onClick={() => setRangeOption(option)}
                  >
                    {option.name}
                  </Button>
                ))}
              </ButtonGroup>
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  )
}
