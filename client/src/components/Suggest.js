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
      ommActions: PropTypes.object.isRequired,
      omm: PropTypes.object.isRequired,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange(event, { newValue, method }) {
    event.preventDefault();
    this.props.ommActions.onChange(newValue);
  }

  onKeyPress(event) {
    this.props.ommActions.suggestOnKeyPress(event,
        this.props.omm.value);
  }

  onSuggestionSelected(event, { suggestion, suggestionValue }) {
    this.props.ommActions.onSuggestionSelected(suggestion,
        this.props.omm.searchTarget);
  }

  render() {
    const inputProps = {
      placeholder: this.props.omm.searchPlaceHolder,
      value: this.props.omm.value,
      onChange: this.onChange,
      onKeyDown: this.onKeyPress,
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
