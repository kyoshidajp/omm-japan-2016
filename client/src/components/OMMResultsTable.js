import {
  default as React,
  PropTypes,
  Component
} from 'react';
import {
  Table
} from 'react-bootstrap';
import FaTrash from 'react-icons/lib/fa/trash';

export default class OMMResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.deleteResult = this.deleteResult.bind(this);
    this.isCheckedControl = this.isCheckedControl.bind(this);
  };

  deleteResult(bib) {
    this.props.ommActions.deleteResult(bib);
  }

  isCheckedControl(bib, mark_id) {
    if (!this.props.omm.bibCodesMap.has(bib)) return false;
    return this.props.omm.bibCodesMap.get(bib).indexOf(Number(mark_id)) > -1;
  };

  render() {
    return (
      <Table bordered striped condensed hover responsive>
        <thead>
          <tr>
            <th />
            <th>bib</th>
            <th>rank</th>
            <th>score</th>
            <th>players</th>
            <th>route</th>
          </tr>
        </thead>
        <tbody>
          {this.props.omm.compareResults.map(result => (
            <tr key={result.id}>
              <td key={result.id} >
                <a href="#" onClick={() => this.deleteResult(result.bib)}><FaTrash /></a>
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
                  <ul className="players-list">
                  {result.players.map(player => (
                    <li key={player.id}>{player.last_name} {player.first_name}</li>
                  ))}
                  </ul>
                </div>
              </td>
              <td>
                <div className="text-left">
                  {result.controls.map(control =>
                     control.code.toString()
                   ).join('-')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
