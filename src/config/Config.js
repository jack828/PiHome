import React from 'react'
import { Table, Row, Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ config, onToggle, setRangeOption }) => (
  <Row>
    <Table size="sm" dark>
      <thead>
        <tr>
          <th className="text-center">Config</th>
        </tr>
      </thead>
      <tbody>
        <tr
          className="d-flex text-center"
          onClick={() => onToggle('showNicknames')}
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
