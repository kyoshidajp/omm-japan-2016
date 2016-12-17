import React, { Component, PropTypes } from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  Polyline,
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import _ from 'lodash';

import * as OMM from '../constants/OMM';

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
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    {props.compareResults.filter(result =>
      props.bibConfigMap.get(result.bib).display).map(result => (
      <Polyline key={result.id}
        {...props.bibConfigMap.get(result.bib).controls}
      />
    ))}
  </GoogleMap>
));

export default class Map extends Component {

  componentDidMount() {
    this.props.searchActions.loadControls(
      this.props.search.selectedDay);
  }

  render() {
    return (
      <AsyncGoogleMap
        googleMapURL={OMM.GOOGLE_MAP_API_URL}
        loadingElement={
          <div style={{ height: '100%', width: '100%' }}>
            <FaSpinner
              style={{
                display: 'block',
                width: '80px',
                height: '80px',
                margin: '150px auto',
                animation: 'fa-spin 2s infinite linear',
              }}
            />
          </div>
        }
        containerElement={
          <div style={{
            height: '500px',
            alighnItems: 'center' }} />
        }
        mapElement={
          <div style={{ height: '600px' }} />
        }
        markers={this.props.search.markers}
        compareResults={this.props.search.compareResults}
        bibConfigMap={this.props.search.bibConfigMap}
      />
    );
  }
}
