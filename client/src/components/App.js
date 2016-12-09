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
import Header from './Header';
import MapContainer from '../containers/mapContainer';
import SearchContainer from '../containers/searchContainer';

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
            <Col xs={4} md={4}>
              <SearchContainer />
            </Col>
          </Row>
          {this.props.search.searchPlayersResults.length > 0 ?
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
                  {this.props.search.searchPlayersResults.map(player =>
                    <tr key={player.id}>
                      <td>
                        <a href="#" onClick={() => this.props.searchActions.addCompareResult(player.bib)}><FaPlus /></a>
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
