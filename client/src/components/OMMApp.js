import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import FaSpinner from 'react-icons/lib/fa/spinner';
import $ from 'jquery';
import _ from 'lodash';

import * as OMM from '../constants/OMM';
import * as OMMActions from '../actions/OMM';
import ResultTable from './ResultTable';
import Suggest from './Suggest';
import OMMNavbar from './OMMNavbar';
import AsyncGettingStartedExample from './AsyncGettingStartedExample';

const AsyncGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={OMM.CENTER_POINT}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    {props.results.map(result => (
      <Polyline key={result.id}
        {...props.routes.get(result.id)}
      />
    ))}
  </GoogleMap>
));

class OMMApp extends Component {

  constructor(props) {
    super(props);

    const propTypes = {
      ommActions: PropTypes.object.isRequired,
      omm: PropTypes.object.isRequired,
      suggest: PropTypes.object.isRequired,
    };

    this.state = {
      markers: [],
      results: [],
      allResults: [],
      routes: new Map(),
    }
  }

  componentDidMount() {
    this.props.ommActions.loadControls();
    this.props.ommActions.loadResults();
  }

  render() {
    return (
      <div>
        <OMMNavbar style={{ height: `100%`, width: `100%` }}/>
        <Grid fluid={true}>
          <Row className="show-grid omm-column">
            <Col xs={3} md={3}>
              <Suggest
                allResults={this.props.omm.allResults}
                displayResults={this.state.results}
                omm={this.props.omm}
                ommActions={this.props.ommActions}
              />
            </Col>
            <Col xs={9} md={9} />
          </Row>
          <Row className="show-grid omm-column">
            <Col xs={3} md={3}>
              <ResultTable
                omm={this.props.omm}
                ommActions={this.props.ommActions}
                controls={this.controls}
                addResult={this.addResult}
                deleteResult={this.deleteResult}
                results={this.state.results} />
            </Col>
            <Col xs={9} md={9}>
              <AsyncGoogleMap 
                googleMapURL={OMM.GOOGLE_MAP_API_URL}
                loadingElement={
                  <div style={{ height: `100%`, width: `100%` }}>
                    <FaSpinner
                      style={{
                        display: `block`,
                        width: `80px`,
                        height: `80px`,
                        margin: `150px auto`,
                        animation: `fa-spin 2s infinite linear`,
                      }}
                    />
                  </div>
                }
                containerElement={
                  <div style={{
                    height: `500px`,
                    alighnItems: 'center', }} />
                }
                mapElement={
                  <div style={{ height: `500px` }} />
                }
                markers={this.props.omm.markers}
                results={this.state.results}
                routes={this.state.routes}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    omm: state.omm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ommActions: bindActionCreators(OMMActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OMMApp);
