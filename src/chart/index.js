import { connect } from 'react-redux'
import Chart from './Chart'
import { loadData } from '../data.ducks'

const mapStateToProps = ({ data, config }) => ({
  data: data.toJS(),
  config: config.toJS()
})

const mapDispatchToProps = dispatch => ({
  loadData: options => dispatch(loadData(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
