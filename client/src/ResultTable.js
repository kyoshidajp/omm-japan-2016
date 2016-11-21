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
      results: PropTypes.array,
      markers: PropTypes.array,
    };

    this.controls1 = new Set();
    this.controls2 = new Set();
    this.is_checked_control1 = this.is_checked_control1.bind(this);
    this.is_checked_control2 = this.is_checked_control2.bind(this);
  };

  controls() {
    let [first, second] = this.props.results;
    if (this.props.results.length === 0) return;
    this.controls1 = new Set(first.route.split('-'));
    this.controls2 = new Set(second.route.split('-'));
  };

  is_checked_control1(mark_id) {
    return this.controls1.has(mark_id);
  };

  is_checked_control2(mark_id) {
    return this.controls2.has(mark_id);
  };

  render() {
    this.controls();
    return (
      <div>
        <h2>Compare</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {this.props.results.map(result => (
                <th key={result.id}>{result.bib}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.markers.map(marker => (
              <tr key={marker.key}>
                <td>{marker.key}</td>
                <td>{this.is_checked_control1(marker.label) ? 'x' : ''}</td>
                <td>{this.is_checked_control2(marker.label) ? 'x' : ''}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
