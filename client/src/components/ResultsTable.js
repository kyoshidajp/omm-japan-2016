import React, { Component, PropTypes } from 'react';
import { Table, Modal } from 'react-bootstrap';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import FaQuestion from 'react-icons/lib/fa/question';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import ToggleButton from 'react-toggle-button';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import * as OMM_CONST from '../constants/OMM';

const IfModal = props => (
  <a href="#" onClick={props.click}>
    <FaQuestion />
    <Modal show={props.show} onHide={() => props.close()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
    </Modal>
  </a>
);

export default class ResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      search: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.state = {
      showModalIfScore: false,
      showModalIfRank: false,
    };

    this.isCheckedControl = this.isCheckedControl.bind(this);
    this.joinPlayers = this.joinPlayers.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
    this.sortIcon = this.sortIcon.bind(this);
    this.openModalIfScore = this.openModalIfScore.bind(this);
    this.closeModalIfScore = this.closeModalIfScore.bind(this);
    this.openModalIfRank = this.openModalIfRank.bind(this);
    this.closeModalIfRank = this.closeModalIfRank.bind(this);
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

  sortIcon(field) {
    const sortOrder = this.props.search.sortOrder;
    let icon = '';
    if (sortOrder === OMM_CONST.SORT_ORDER.ASC) {
      icon = <a href="#" onClick={() => this.props.searchActions.sortResultTable(field, OMM_CONST.SORT_ORDER.ASC)}><FaArrowDown /></a>;
    }

    if (sortOrder === OMM_CONST.SORT_ORDER.DESC) {
      icon = <a href="#" onClick={() => this.props.searchActions.sortResultTable(field, OMM_CONST.SORT_ORDER.DESC)}><FaArrowUp /></a>;
    }

    return icon;
  }

  openModalIfScore() {
    this.setState({ showModalIfScore: true });
  }

  closeModalIfScore() {
    this.setState({ showModalIfScore: false });
  }

  openModalIfRank() {
    this.setState({ showModalIfRank: true });
  }

  closeModalIfRank() {
    this.setState({ showModalIfRank: false });
  }

  showScoreIfHelpIcon() {
    const title = 'What is "score if ..."';
    const message = 'It is the score when there is no miss score exceeding the time limit.';
    return <IfModal
             click={this.openModalIfScore}
             show={this.state.showModalIfScore}
             close={this.closeModalIfScore}
             title={title} message={message} />;
  }

  showRankIfHelpIcon() {
    const title = 'What is "rank if ..."';
    const message = 'It is the rank when there is no miss score exceeding the time limit. In the case of ties the official score will take precedence.';
    return <IfModal
             click={this.openModalIfRank}
             show={this.state.showModalIfRank}
             close={this.closeModalIfRank}
             title={title} message={message} />;
  }

  formatDemeritPoint(point) {
    return point === 0 ? point : point;
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
            <th className="rank">
              rank {this.sortIcon(OMM_CONST.SORT_FIELDS.RANK)}
            </th>
            <th className="score">score</th>
            <th className="time">time</th>
            <th className="adjust">adjust</th>
            <th className="players">players</th>
            <th className="score-if">score if ...
              {this.showScoreIfHelpIcon()}
            </th>
            <th className="rank-if">rank if ...
              {this.showRankIfHelpIcon()}
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.search.compareResults.map(result => (
            <tr key={result.id}
              onMouseEnter={() => this.props.searchActions.hoverResultTableRow(result.bib)}
              onMouseLeave={() => this.props.searchActions.outResultTableRow()} >
              <td key={result.id} >
                <a href="#" onClick={() => this.deleteResult(result.bib)}><FaMinusCircle className="del-result" /></a>
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
                      hover: 'rgb(95,96,98)',
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
                <div className="text-right">{result.time}</div>
              </td>
              <td>
                <div className="text-right">{result.demerit_point}</div>
              </td>
              <td>
                <div className="text-left">
                  {this.joinPlayers(result.players)}
                </div>
              </td>
              <td>
                <div className="text-right">{result.score_without_demerit_point}</div>
              </td>
              <td>
                <div className="text-right">{result.rank_without_demerit_point}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
