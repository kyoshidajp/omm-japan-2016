import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  InputGroup,
  FormGroup,
  ButtonToolbar,
  DropdownButton,
  Dropdown,
  MenuItem,
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
import FaPlus from 'react-icons/lib/fa/plus';
import $ from 'jquery';
import _ from 'lodash';

import * as OMM from '../constants/OMM';
import * as OMMActions from '../actions/OMM';
import OMMControlsTable from './OMMControlsTable';
import OMMResultsTable from './OMMResultsTable';
import Suggest from './Suggest';
import OMMNavbar from './OMMNavbar';

const AsyncGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={OMM.CENTER_POINT}
    onClick={props.onMapClick}
    options={{ scrollwheel: false }}
  >
    <Marker
      position={OMM.START_POINT}
      label="start" />
    <Marker
      position={OMM.FINISH_POINT}
      label="finish" />
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    {props.compareResults.map(result => (
      <Polyline key={result.id}
        {...props.bibControlsMap.get(result.bib)}
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
  }

  componentDidMount() {
    this.props.ommActions.loadControls();
    this.props.ommActions.loadBibs();
  }

  render() {
    return (
      <div>
        <OMMNavbar style={{ height: `100%`, width: `100%` }}/>
        <Grid fluid={true}>
          <Row className="show-grid omm-column">
            <Col xs={4} md={4}>
              <FormGroup>
                <InputGroup>
                  <DropdownButton bsStyle="primary" 
                    componentClass={InputGroup.Button}
                    title={this.props.omm.searchTarget}
                    id="input-dropdown-addon">
                    {this.props.omm.searchTargets.map(target =>
                      <MenuItem key={target} eventKey="1"
                        onClick={() => this.props.ommActions.onChangeSearchTarget(target)}>{target}</MenuItem>
                    )}
                  </DropdownButton>
                  <Suggest
                    allResults={this.props.omm.allResults}
                    omm={this.props.omm}
                    ommActions={this.props.ommActions}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          {this.props.omm.searchPlayersResults.length > 0 ?
            <Row className="show-grid omm-column">
              <Col xs={12} md={12}>
                <Table bordered striped condensed hover responsive>
                  <thead>
                    <tr>
                      <th />
                      <th>bib</th>
                      <th>name</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.props.omm.searchPlayersResults.map(player => 
                    <tr key={player.id}>
                      <td>
                        <a href="#" onClick={() => this.props.ommActions.addCompareResult(player.bib)}><FaPlus /></a>
                      </td>
                      <td>
                        <div className="text-left">{player.bib}</div>
                      </td>
                      <td>
                        <div className="text-left">{player.last_name} {player.first_name}</div>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
            : '' }
          {this.props.omm.compareResults.length > 0 ?
            <Row className="show-grid omm-column result-table">
              <Col xs={12} md={12}>
                <OMMResultsTable
                  omm={this.props.omm}
                  ommActions={this.props.ommActions}
                  controls={this.controls}
                  addResult={this.addResult}
                  deleteResult={this.deleteResult}
                />
              </Col>
            </Row>
            : '' }
          <Row className="show-grid omm-column controls-table">
            {this.props.omm.compareResults.length > 0 ?
            <Col xs={this.props.omm.gridWidth.controlsTable}
                 md={this.props.omm.gridWidth.controlsTable}>
              <OMMControlsTable
                omm={this.props.omm}
                ommActions={this.props.ommActions}
                controls={this.controls}
                addResult={this.addResult}
                deleteResult={this.deleteResult}
              />
            </Col> : '' }
            <Col xs={this.props.omm.gridWidth.map}
                 md={this.props.omm.gridWidth.map}>
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
                  <div style={{ height: `600px` }} />
                }
                markers={this.props.omm.markers}
                compareResults={this.props.omm.compareResults}
                bibControlsMap={this.props.omm.bibControlsMap}
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
