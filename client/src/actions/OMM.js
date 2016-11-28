import Axios from 'axios';

export const ADD_COMPARE_RESULT = 'ADD_COMPARE_RESULT';
export const DELETE_COMPARE_RESULT = 'DELETE_COMPARE_RESULT';
export const LOAD_RESULTS = 'LOAD_RESULTS';
export const LOAD_CONTROLS_REQUEST = 'LOAD_CONTROLS_REQUEST';
export const LOAD_CONTROLS_RESULT = 'LOAD_CONTROLS_RESULT';
export const LOAD_RESULTS_REQUEST = 'LOAD_RESULTS_REQUEST';
export const LOAD_RESULTS_RESULT = 'LOAD_RESULTS_RESULT';
export const SUGGEST_ON_CHANGE = 'SUGGEST_ON_CHANGE';
export const SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED';
export const SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED';
export const SUGGEST_ON_SUGGESTION_SELECTED = 'SUGGEST_ON_SUGGESTION_SELECTED';

export function addCompareResult(value) {
  return {
    type: ADD_COMPARE_RESULT,
    value: value
  }
}

export function deleteCompareResult(bib) {
  return {
    type: DELETE_COMPARE_RESULT,
    bib
  }
}

export function onChange(value) {
  return {
    type: SUGGEST_ON_CHANGE,
    value: value
  }
}

export function onSuggestionsFetchRequested(value, results) {
  return {
    type: SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
    value: value.value,
    results: results,
  }
}

export function onSuggestionsClearRequested() {
  return {
    type: SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED
  }
}

export function onSuggestionSelected(value) {
  return {
    type: SUGGEST_ON_SUGGESTION_SELECTED,
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
    type: LOAD_CONTROLS_REQUEST,
  };
}

function loadControlsResult(result) {
  return {
    type: LOAD_CONTROLS_RESULT,
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
    type: LOAD_RESULTS_REQUEST,
  };
}

function loadResultsResult(result) {
  return {
    type: LOAD_RESULTS_RESULT,
    result: result,
  };
}
