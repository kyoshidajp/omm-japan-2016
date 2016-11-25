import {
  default as React,
  PropTypes,
  Component
} from 'react';
import {
  Table
} from 'react-bootstrap';

export default class ResultTable extends Component {
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
      <Table striped condensed hover responsive>
        <thead>
          <tr>
            <td />
            {this.props.omm.compareResults.map(result => (
              <td key={result.id} onClick={() => this.deleteResult(result.bib)}>delete</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bib:</td>
            {this.props.omm.compareResults.map(result => (
              <td key={result.id}>{result.bib}</td>
            ))}
          </tr>
          <tr>
            <td>score:</td>
            {this.props.omm.compareResults.map(result => (
              <td key={result.id}>{result.score}</td>
            ))}
          </tr>
          <tr>
            <td>players:</td>
            {this.props.omm.compareResults.map(result => (
              <td key={result.id}>
                <ul>
                {result.players.map(player => (
                  <li key={player.id}>{player.last_name} {player.first_name}</li>
                ))}
                </ul>
              </td>
            ))}
          </tr>
          {this.props.omm.markers.map(marker => (
            <tr key={marker.key}>
              <td>{marker.label}</td>
              {this.props.omm.compareResults.map(result => (
                <td key={result.id}>{this.isCheckedControl(result.bib, marker.label) ? 'x' : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
