import {
  default as React,
  PropTypes,
  Component
} from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
  <span>{suggestion}</span>
);

export default class Suggest extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      ommActions: PropTypes.object.isRequired,
      omm: PropTypes.object.isRequired,
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

    let result_bibs = this.props.omm.allResults.map(result =>
      result.bib.toString()
    );
    return inputLength === 0 ? [] : result_bibs.filter(bib =>
      bib.slice(0, inputLength) === inputValue
    );
  };

  onChange(event, { newValue }) {
    this.props.ommActions.onChange(newValue);
    /*
    this.setState({
      value: newValue
    });
    */
  };

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested() {
    this.props.ommActions.onSuggestionsClearRequested();
  };

  onSuggestionSelected(event, { suggestion, suggestionValue}) {
    this.props.ommActions.onSuggestionSelected(suggestion);
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a bib',
      value: this.props.omm.value,
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
