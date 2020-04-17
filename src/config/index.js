import { connect } from 'react-redux'
import Config from './Config'
import { toggle } from '../config.ducks'

const mapStateToProps = ({ config }) => ({ config: config.toJS() })

const mapDispatchToProps = dispatch => ({
  onToggle: options => dispatch(toggle(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)
