import { connect } from 'react-redux'
import Node from './Node'
import { save } from '../node.ducks'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onSave: options => dispatch(save(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
