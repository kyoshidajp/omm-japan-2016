import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import ToggleButton from 'react-toggle-button';

export default class ResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      search: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.isCheckedControl = this.isCheckedControl.bind(this);
    this.joinPlayers = this.joinPlayers.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
  }

  isCheckedControl(bib, markId) {
    if (!this.props.search.bibCodesMap.has(bib)) return false;
    return this.props.search.bibCodesMap.get(bib).indexOf(Number(markId)) > -1;
  }

  joinPlayers(players) {
    return players.map(player => `${player.last_name} ${player.first_name}`)
      .join(' / ');
  }

  deleteResult(bib) {
    this.props.searchActions.deleteCompareResult(bib);
    window.suggestInput.focus();
  }

  render() {
    return (
      <Table striped condensed hover responsive bordered
        className="result-table">
        <thead>
          <tr>
            <th className="delete" />
            <th className="disp-toggle" />
            <th className="bib">bib</th>
            <th className="rank">rank</th>
            <th className="score">score</th>
            <th className="players">players</th>
            <th className="routes">route</th>
          </tr>
        </thead>
        <tbody>
          {this.props.search.compareResults.map(result => (
            <tr key={result.id}
              onMouseEnter={() => this.props.searchActions.hoverResultTableRow(result.bib)}
              onMouseLeave={() => this.props.searchActions.outResultTableRow()} >
              <td key={result.id} >
                <a href="#" onClick={() => this.deleteResult(result.bib)}><FaMinusCircle /></a>
              </td>
              <td>
                <ToggleButton
                  inactiveLabel={''}
                  activeLabel={''}
                  onToggle={() => this.props.searchActions.changeDisplayRoute(result.bib)}
                  value={this.props.search.bibConfigMap.get(result.bib).display}
                  colors={{
                    activeThumb: {
                      base: '#fff',
                    },
                    inactiveThumb: {
                      base: '#fff',
                    },
                    active: {
                      base: this.props.search.bibConfigMap.get(result.bib).color,
                      hover: 'rgb(177, 191, 215)',
                    },
                    inactive: {
                      base: 'rgb(65,66,68)',
                      hover: 'rgb(95,96,98)',
                    }
                  }}
                  />
              </td>
              <td>
                <div className="text-right">{result.bib}</div>
              </td>
              <td>
                <div className="text-right">{result.rank}</div>
              </td>
              <td>
                <div className="text-right">{result.score}</div>
              </td>
              <td>
                <div className="text-left">
                  {this.joinPlayers(result.players)}
                </div>
              </td>
              <td>
                <div className="text-left">
                  S-
                  {result.controls.map(control =>
                     control.code.toString(),
                   ).join('-')}
                  {result.score > 0 ? '-F' : ''}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
