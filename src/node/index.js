import { connect } from 'react-redux'
import Nodes from './Nodes'
import { loadNodes } from '../node.ducks'

const mapStateToProps = ({ node }) => ({
  node: node.toJS()
})

const mapDispatchToProps = dispatch => ({
  loadNodes: options => dispatch(loadNodes(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes)
