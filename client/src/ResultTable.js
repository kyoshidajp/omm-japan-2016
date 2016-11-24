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
      allResults: PropTypes.array,
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
    this.addResult = this.props.addResult.bind(this);
  }

  getSuggestions(value) {
    let inputValue = value.toString();
    let inputLength = inputValue.length;

    let result_bibs = this.props.allResults.map(result =>
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
      controls: PropTypes.array,
      results: PropTypes.array,
      markers: PropTypes.array,
      addResult: React.PropTypes.func,
      deleteResult: React.PropTypes.func,
    };

    this.state = {
      results: []
    }

    this.isCheckedControl = this.isCheckedControl.bind(this);
    this.addResult = this.props.addResult.bind(this);
    this.deleteResult = this.props.deleteResult.bind(this);
  };

  isCheckedControl(bib, mark_id) {
    if (!this.props.controls.has(bib)) return false;
    return this.props.controls.get(bib).indexOf(Number(mark_id)) > -1;
  };

  render() {
    return (
      <div>
        <Suggest
          results={this.props.results}
          allResults={this.props.allResults}
          displayResults={this.state.results}
          addResult={this.addResult}
        />
        <Table striped condensed hover responsive>
          <thead>
            <tr>
              <td />
              {this.props.results.map(result => (
                <td key={result.id} onClick={() => this.deleteResult(result.bib)}>delete</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>bib:</td>
              {this.props.results.map(result => (
                <td key={result.id}>{result.bib}</td>
              ))}
            </tr>
            <tr>
              <td>score:</td>
              {this.props.results.map(result => (
                <td key={result.id}>{result.score}</td>
              ))}
            </tr>
            <tr>
              <td>players:</td>
              {this.props.results.map(result => (
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
                {this.props.results.map(result => (
                  <td key={result.id}>{this.isCheckedControl(result.bib, marker.label) ? 'x' : ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
