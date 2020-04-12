import React, { useState } from 'react'
import { Table, Col, Row, Input } from 'reactstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ config, setConfig }) => {
  const toggle = property => {
    setConfig(prevState => ({ ...prevState, [property]: !prevState[property] }))
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
                icon={config.showNicknames ? 'check' : 'minus'}
              />
            </th>
            <td className="col-4">
              {config.showNicknames ? 'Hide' : 'Show'} nicknames
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  )
}
