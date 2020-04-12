import React, { useState } from 'react'
import { Table, Col, Row, Button, ButtonGroup } from 'reactstrap'
import moment from 'moment'
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
            <td className="col-4">Set date range</td>
            <td className="col-7">
              <ButtonGroup size="sm">
                {config.rangeOptions.map(option => (
                  <Button
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
