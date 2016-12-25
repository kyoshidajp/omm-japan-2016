import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import ReactPaginate from 'react-paginate';

const Pagenate = props => (
  <ReactPaginate previousLabel={<FaAngleLeft />}
                 nextLabel={<FaAngleRight />}
                 breakLabel={<a href="">...</a>}
                 breakClassName={'break-me'}
                 pageCount={props.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={props.onPageChange}
                 containerClassName={'pagination'}
                 subContainerClassName={'pages pagination'}
                 activeClassName={'active'} />
);

const PagenateHeader = (props) => {
  const current = (props.offset * props.range) - props.range;
  const maxCount = Math.min(current + props.range, props.total);
  return <div>{current + 1} - {maxCount} / {props.total}</div>;
};

export default class SearchPlayerResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      search: PropTypes.object.isRequired,
      searchActions: PropTypes.object.isRequired,
    };

    this.addResult = this.addResult.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  addResult(bib, handler) {
    this.props.searchActions.addCompareResult(bib, handler);
    window.suggestInput.focus();
  }

  handlePageClick(data) {
    this.props.searchActions.onPageChange(this.props.search.value,
                                          this.props.search.pageLimit,
                                          data.selected);
  }

  render() {
    return (
      <div>
        <PagenateHeader
          offset={this.props.search.pageOffset}
          range={this.props.search.pageLimit}
          total={this.props.search.pageTotal} />
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
                <a href="#" onClick={() => this.addResult(player.bib, this.props.search.selectedDay)}><FaPlusCircle className="add-result" /></a>
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
        <Pagenate
          onPageChange={this.handlePageClick}
          pageCount={this.props.search.pageCount} />
      </div>
    );
  }
}
