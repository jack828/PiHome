import { connect } from 'react-redux'
import Chart from './Chart'
import { loadData } from '../data.ducks'

const mapStateToProps = ({ data }) => ({
  data: data.toJS()
})

const mapDispatchToProps = dispatch => ({
  loadData: options => dispatch(loadData(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
