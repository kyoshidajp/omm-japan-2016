import {
  default as React,
  PropTypes,
  Component
} from 'react';

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
