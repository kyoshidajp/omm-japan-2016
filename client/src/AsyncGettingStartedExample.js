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
import OMMNavbar from "./OMMNavbar";

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
      allResults: [],
      routes: new Map(),
    }

    this.controls = new Map();
    this.routes = new Map();
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.addResult = this.addResult.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
  }

  addResult(bib) {
    let newResult = this.state.allResults.filter(result =>
      result.bib == bib
    );
    let results = this.state.results.concat(newResult);
    this.setState({ results: results });
    this.setControls(results);
  }

  setControls(results) {
    for (let result of results) {
      this.controls.set(result.bib, result.controls.map(control => {
        return control.code;
      }));
    }
  };

  deleteResult(bib) {
    let results = this.state.results.filter(result =>
      result.bib !== bib
    );
    this.setState({
      results: results,
    });
    this.setControls(results);
  }

  addMarker(data) {
    for (let control of data) {
      this.controls.set(control.code, control);
    }
    this.setState({markers: data.map(control => {
      return {
        position: {
          lat: control.lat,
          lng: control.lng,
        },
        label: control.code.toString(),
        key: control.id
      }
    })});
  }

  loadControlsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => { 
        this.addMarker(data);
        this.loadResultFromServer();
      },
      error: (xhr, status, err) => console.error(this.props.url, status, err.toStrig())
    });
  }

  cacheRoute(data) {
    let results = data.map(result => {
      let controls = result.controls;
      let path = controls.map(control => {
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
    this.setState({
      allResults: data,
      routes: this.routes,
    });
  }

  loadResultFromServer() {
    $.ajax({
      url: this.props.resultsUrl,
      datatype: 'json',
      cache: false,
      success: data => {
        this.cacheRoute(data);
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

  render() {
    return (
      <div>
        <OMMNavbar style={{ height: `100%`, width: `100%` }}/>
        <Grid fluid={true}>
          <Row className="show-grid">
            <Col xs={3} md={3}>
              <ResultTable
                controls={this.controls}
                addResult={this.addResult}
                deleteResult={this.deleteResult}
                markers={this.state.markers}
                allResults={this.state.allResults}
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
                markers={this.state.markers}
                results={this.state.results}
                routes={this.state.routes}
              />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
