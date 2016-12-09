import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/map';
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
    mapActions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
