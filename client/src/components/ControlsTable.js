import {
  default as React,
  PropTypes,
  Component,
} from 'react';
import {
  Table,
} from 'react-bootstrap';
import FaTrash from 'react-icons/lib/fa/trash';
import FaCheck from 'react-icons/lib/fa/check';
import * as OMM_CONST from '../constants/OMM';

export default class ContorlsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      map: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.isCheckedControl = this.isCheckedControl.bind(this);
    this.getContorols = this.getControls.bind(this);
  }

  isCheckedControl(bib, markId) {
    if (!this.props.search.bibConfigMap.has(bib)) return false;
    return this.props.search.bibConfigMap.get(bib).codes.indexOf(Number(markId)) > -1;
  }

  getControls() {
    return this.props.search.markers.filter(marker => marker.label !== OMM_CONST.START_POINT.LABEL && marker.label !== OMM_CONST.FINISH_POINT.LABEL);
  }

  render() {
    const controls = this.getControls();
    return (
      <Table striped condensed hover responsive>
        <thead>
          <tr>
            <th><div className="text-right">bib</div></th>
            {this.props.search.compareResults.map(result => (
              <th key={result.id}>
                <div className="text-center">{result.bib}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {controls.map(marker => (
            <tr key={marker.key}>
              <td><div className="text-right">{marker.label}</div></td>
              {this.props.search.compareResults.map(result => (
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
