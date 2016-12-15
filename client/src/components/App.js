import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import FaPlus from 'react-icons/lib/fa/plus';
import $ from 'jquery';

import ControlsTable from './ControlsTable';
import ResultsTable from './ResultsTable';
import SearchPlayerResultsTable from './SearchPlayerResultsTable';
import Header from './Header';
import MapContainer from '../containers/MapContainer';
import SearchContainer from '../containers/SearchContainer';

export default class App extends Component {

  constructor(props) {
    super(props);

    const propTypes = {
      ommActions: PropTypes.object.isRequired,
      map: PropTypes.object.isRequired,
      search: PropTypes.object.isRequired,
      suggest: PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <div>
        <Header style={{ height: '100%', width: '100%' }}/>
        <Grid fluid={true}>
          <Row className="show-grid omm-column">
            <Col xs={12} md={12}>
              <SearchContainer />
            </Col>
          </Row>
          {this.props.search.searchPlayersResults.length > 0 ?
            <Row className="show-grid omm-column">
              <Col xs={12} md={12}>
                <SearchPlayerResultsTable
                 search={this.props.search}
                 searchActions={this.props.searchActions}
                 />
              </Col>
            </Row>
            : '' }
          {this.props.search.compareResults.length > 0 ?
            <Row className="show-grid omm-column result-table">
              <Col xs={12} md={12}>
                <ResultsTable
                  search={this.props.search}
                  ommActions={this.props.ommActions}
                  searchActions={this.props.searchActions}
                  controls={this.controls}
                  addResult={this.addResult}
                  deleteResult={this.deleteResult}
                />
              </Col>
            </Row>
            : '' }
          <Row className="show-grid omm-column controls-table">
            {this.props.search.compareResults.length > 0 ?
            <Col xs={this.props.search.gridWidth.controlsTable}
                 md={this.props.search.gridWidth.controlsTable}>
              <ControlsTable
                map={this.props.map}
                search={this.props.search}
                ommActions={this.props.ommActions}
                controls={this.controls}
                addResult={this.addResult}
                deleteResult={this.deleteResult}
              />
            </Col> : '' }
            <Col xs={this.props.search.gridWidth.map}
                 md={this.props.search.gridWidth.map}>
              <MapContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
