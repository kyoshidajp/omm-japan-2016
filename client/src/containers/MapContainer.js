import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchActions from '../actions/search';
import Map from '../components/map';

function mapStateToProps(state) {
  return {
    map: state.map,
    omm: state.omm,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
