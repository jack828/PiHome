import { connect } from 'react-redux'
import Config from './Config'
// import { save } from '../config.ducks'

const mapStateToProps = ({ config }) => ({ config: config.toJS() })

const mapDispatchToProps = dispatch => ({
  // onSave: options => dispatch(save(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)
