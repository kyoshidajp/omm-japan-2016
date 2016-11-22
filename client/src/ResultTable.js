import {
  default as React,
  PropTypes,
  Component
} from 'react';
import {
  Table
} from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
  <span>{suggestion}</span>
);

class Suggest extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      results: PropTypes.array,
      displayResults: PropTypes.array,
      addResult: React.PropTypes.func,
    };

    this.state = {
      value: '',
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  getSuggestions(value) {
    let inputValue = value.toString();
    let inputLength = inputValue.length;

    let result_bibs = this.props.results.map(result =>
      result.bib.toString()
    );
    return inputLength === 0 ? [] : result_bibs.filter(bib =>
      bib.slice(0, inputLength) === inputValue
    );
  };

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected(event, { suggestion, suggestionValue}) {
    this.props.addResult(suggestionValue);
    this.setState({ value: '' });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a bib',
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default class ResultTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      results: PropTypes.array,
      markers: PropTypes.array,
    };

    this.state = {
      results: []
    }

    this.controls1 = new Set();
    this.controls2 = new Set();
    this.is_checked_control1 = this.is_checked_control1.bind(this);
    this.is_checked_control2 = this.is_checked_control2.bind(this);
    this.addResult = this.addResult.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
  };

  controls() {
    if (this.state.results.length === 0) return;
    let [first, second] = this.state.results;
    this.controls1 = (typeof first === "undefined") ?
      new Set() : new Set(first.route.split('-').map(r => Number(r)));
    this.controls2 = (typeof second === "undefined") ?
      new Set() : new Set(second.route.split('-').map(r => Number(r)));
  };

  is_checked_control1(mark_id) {
    return this.controls1.has(mark_id);
  };

  is_checked_control2(mark_id) {
    return this.controls2.has(mark_id);
  };

  addResult(bib) {
    let newResult = this.props.results.filter(result =>
      result.bib.toString() === bib
    );
    this.setState({
      results: this.state.results.concat(newResult),
    });
    this.controls();
  }

  deleteResult(bib) {
    let results = this.state.results.filter(result =>
      result.bib !== bib
    );
    this.setState({
      results: results,
    });
    this.controls();
  }

  render() {
    return (
      <div>
        <h2>Compare</h2>
        <Suggest
          results={this.props.results}
          displayResults={this.state.results}
          addResult={this.addResult}
        />
        <Table responsive>
          <thead>
            <tr>
              <td />
              {this.state.results.map(result => (
                <td key={result.id} onClick={() => this.deleteResult(result.bib)}>delete</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>bib:</td>
              {this.state.results.map(result => (
                <td key={result.id}>{result.bib}</td>
              ))}
            </tr>
            <tr>
              <td>score:</td>
              {this.state.results.map(result => (
                <td key={result.id}>{result.score}</td>
              ))}
            </tr>
            <tr>
              <td>players:</td>
              {this.state.results.map(result => (
                <td key={result.id}>
                  <ul>
                  {result.players.map(player => (
                    <li key={player.id}>{player.last_name} {player.first_name}</li>
                  ))}
                  </ul>
                </td>
              ))}
            </tr>
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
