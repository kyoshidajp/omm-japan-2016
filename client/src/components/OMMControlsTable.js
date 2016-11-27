import {
  default as React,
  PropTypes,
  Component
} from 'react';
import {
  Table
} from 'react-bootstrap';
import FaTrash from 'react-icons/lib/fa/trash';
import FaCheck from 'react-icons/lib/fa/check';

export default class OMMContorlsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.isCheckedControl = this.isCheckedControl.bind(this);
  };

  isCheckedControl(bib, mark_id) {
    if (!this.props.omm.bibCodesMap.has(bib)) return false;
    return this.props.omm.bibCodesMap.get(bib).indexOf(Number(mark_id)) > -1;
  };

  render() {
    return (
      <Table striped condensed hover responsive>
        <thead>
          <tr>
            <td><div className="text-right">bib:</div></td>
            {this.props.omm.compareResults.map(result => (
              <td key={result.id}>
                <div className="text-center">{result.bib}</div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.omm.markers.map(marker => (
            <tr key={marker.key}>
              <td><div className="text-right">{marker.label}</div></td>
              {this.props.omm.compareResults.map(result => (
                <td key={result.id}>
                  <div className="text-center">
                  {this.isCheckedControl(result.bib, marker.label) ? <FaCheck /> : ''}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
