import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../actions/map';
import * as searchActions from '../actions/search';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    omm: state.omm,
    search: state.search,
    map: state.map,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ommActions: bindActionCreators(mapActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
