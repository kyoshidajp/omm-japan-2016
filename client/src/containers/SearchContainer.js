import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/search';
import Search from '../components/search';

function mapStateToProps(state) {
  return {
    search: state.search,
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
