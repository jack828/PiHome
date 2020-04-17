import { connect } from 'react-redux'
import Config from './Config'
import { toggle, changeRange } from '../config.ducks'

const mapStateToProps = ({ config }) => ({ config: config.toJS() })

const mapDispatchToProps = dispatch => ({
  onToggle: options => dispatch(toggle(options)),
  onChangeRange: options => dispatch(changeRange(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)
