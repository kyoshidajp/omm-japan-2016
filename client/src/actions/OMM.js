import Axios from 'axios';
import * as OMM from '../constants/OMM';

export function addCompareResult(value) {
  return {
    type: OMM.ADD_COMPARE_RESULT,
    value: value
  }
}

export function onChange(value) {
  return {
    type: OMM.SUGGEST_ON_CHANGE,
    value: value
  }
}

export function deleteResult(bib) {
  return {
    type: OMM.DELETE_RESULT,
    bib
  }
}

export function onSuggestionsFetchRequested(value, results) {
  return {
    type: OMM.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
    value: value,
    results: results,
  }
}

export function onSuggestionsClearRequested() {
  return {
    type: OMM.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED
  }
}

export function onSuggestionSelected(value) {
  return {
    type: OMM.SUGGEST_ON_SUGGESTION_SELECTED,
    value,
  }
}

export function loadControls() {
  return dispatch => {
    dispatch(loadControlsRequest());

    Axios.get('/api/v1/controls.json').then(
      response => dispatch(loadControlsResult(response.data))
    ).catch(
      response => console.log(response)
    );
  };
}

function loadControlsRequest() {
  return {
    type: OMM.LOAD_CONTROLS_REQUEST,
  };
}

function loadControlsResult(result) {
  return {
    type: OMM.LOAD_CONTROLS_RESULT,
    result,
  };
}

export function loadResults() {
  return dispatch => {
    dispatch(loadResultsRequest());

    Axios.get('/api/v1/results.json').then(
      response => dispatch(loadResultsResult(response.data))
    ).catch(
      response => console.log(response)
    );
  };
}

function loadResultsRequest() {
  return {
    type: OMM.LOAD_RESULTS_REQUEST,
  };
}

function loadResultsResult(result) {
  return {
    type: OMM.LOAD_RESULTS_RESULT,
    result: result,
  };
}
