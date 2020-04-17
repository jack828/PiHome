import { connect } from 'react-redux'
import Chart from './Chart'
import { loadData } from '../data.ducks'

const mapStateToProps = ({ data, config, node }) => ({
  data: data.toJS(),
  config: config.toJS(),
  nodes: node.toJS().nodes
})

const mapDispatchToProps = dispatch => ({
  loadData: options => dispatch(loadData(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
