import {
  default as React,
  PropTypes,
  Component
} from 'react';
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import {
  Button,
  Grid,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import FaSpinner from "react-icons/lib/fa/spinner";
import $ from "jquery";
import _ from "lodash";
import ResultTable from "./ResultTable";

const MAP_KEY = 'AIzaSyDGaEAjurBciJPMrX7Hz5Cgdr2TsYYZqfs';
const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`;

const CENTER_POINT = {
  lat: 36.577124,
  lng: 137.861446
};

const FINISH_POINT = {
  lat: 36.598034,
  lng: 137.824866
};

const AsyncGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={CENTER_POINT}
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

export default class AsyncGettingStartedExample extends Component {

  constructor(props) {
    super(props);

    const propTypes = {
      toast: PropTypes.func.isRequired,
    };

    this.state = {
      markers: [],
      results: [],
      routes: new Map(),
    }

    this.controls = new Map();
    this.routes = new Map();
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }

  loadControlsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => {
        for (let control of data) {
          this.controls.set(control.code, control);
        }
        this.setState({markers: data.map((control) => {
          return {
            position: {
              lat: control.lat,
              lng: control.lng,
            },
            label: control.code.toString(),
            key: control.id
          }
        })});
        this.loadResultFromServer();
      },
      error: (xhr, status, err) => console.error(this.props.url, status, err.toStrig())
    });
  }

  loadResultFromServer() {
    $.ajax({
      url: this.props.resultsUrl,
      datatype: 'json',
      cache: false,
      success: data => {
        let results = data.map((result) => {
          let control_ids = result.route.split('-');
          let path = control_ids.map((control_id) => {
            if (control_id === 'F') {
              return FINISH_POINT;
            }
            let control = this.controls.get(Number(control_id));
            return {
              lat: control.lat,
              lng: control.lng,
            };
          });

          let routepath = {
            path: path,
            geodesic: true,
            strokecolor: '#ff0000',
            strokeopacity: 1.0,
            strokeweight: 2
          }
          this.routes.set(result.id, routepath);
        });
        this.setState({results: data, routes: this.routes});
      },
      error: (xhr, status, err) => console.error(this.props.resultsUrl, status, err.tostrig())
    });
  }

  componentDidMount() {
    this.loadControlsFromServer();
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: 'nextMarkers' + Date.now(),
      },
    ];

    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
            <ResultTable
              markers={this.state.markers}
              results={this.state.results} />
          </Col>
          <Col xs={9} md={9}>
            <div>
            <AsyncGoogleMap 
              googleMapURL={GOOGLE_MAP_API_URL}
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
              onMapLoad={this.handleMapLoad}
              onMapClick={this.handleMapClick}
              markers={this.state.markers}
              results={this.state.results}
              routes={this.state.routes}
              onMarkerRightClick={this.handleMarkerRightClick}
            />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
