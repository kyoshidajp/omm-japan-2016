import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

export default class SearchPlayerResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      search: PropTypes.object.isRequired,
      searchActions: PropTypes.object.isRequired,
    };

    this.addResult = this.addResult.bind(this);
  }

  addResult(bib, handler) {
    this.props.searchActions.addCompareResult(bib, handler);
    window.suggestInput.focus();
  }

  render() {
    return (
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
              <a href="#" onClick={() => this.addResult(player.bib, this.props.search.selectedDay)}><FaPlusCircle /></a>
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
    );
  }
}
