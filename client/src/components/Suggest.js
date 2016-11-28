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

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange(event, { newValue }) {
    this.props.ommActions.onChange(newValue);
  };

  onSuggestionSelected(event, { suggestion, suggestionValue}) {
    this.props.ommActions.onSuggestionSelected(suggestion);
  };

  render() {
    const inputProps = {
      placeholder: 'Type a bib',
      value: this.props.omm.value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        onSuggestionsFetchRequested={this.props.ommActions.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.ommActions.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        suggestions={this.props.omm.suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
