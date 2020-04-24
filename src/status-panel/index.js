import { connect } from 'react-redux'
import StatusPanel from './StatusPanel'
import { loadData } from '../data.ducks'

const mapStateToProps = ({ data, config, node }) => ({
  data: data.toJS(),
  config: config.toJS(),
  nodes: node.toJS().nodes
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPanel)
