import {
  default as React,
  PropTypes,
  Component,
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
      actions: PropTypes.object.isRequired,
      search: PropTypes.object.isRequired,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.storeInputReference = this.storeInputReference.bind(this);
  }

  storeInputReference(autosuggest) {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  }

  setFocus() {
    this.input.focus();
  }

  onChange(event, { newValue, method }) {
    event.preventDefault();
    this.props.actions.onChange(newValue);
  }

  onKeyPress(event) {
    this.props.actions.suggestOnKeyPress(event,
        this.props.search.value);
  }

  onSuggestionSelected(event, { suggestion, suggestionValue }) {
    this.props.actions.onSuggestionSelected(suggestion,
        this.props.search.searchTarget,
        this.props.search.selectedDay);
  }

  render() {
    const inputProps = {
      placeholder: this.props.search.searchPlaceHolder,
      value: this.props.search.value,
      onChange: this.onChange,
      onKeyDown: this.onKeyPress,
    };
    return (
      <Autosuggest
        focusFirstSuggestion={true}
        ref={this.storeInputReference}
        onSuggestionsFetchRequested={this.props.actions.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.actions.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        suggestions={this.props.search.suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
