import Axios from 'axios';

import * as OMM_CONST from '../constants/OMM';

export const ADD_COMPARE_RESULT = 'ADD_COMPARE_RESULT';
export const DELETE_COMPARE_RESULT = 'DELETE_COMPARE_RESULT';

export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_PLAYERS_REQUEST = 'LOAD_PLAYERS_REQUEST';
export const LOAD_PLAYERS_RESULT = 'LOAD_PLAYERS_RESULT';

export const LOAD_RESULTS = 'LOAD_RESULTS';

export const LOAD_CONTROLS_REQUEST = 'LOAD_CONTROLS_REQUEST';
export const LOAD_CONTROLS_RESULT = 'LOAD_CONTROLS_RESULT';
export const LOAD_BIBS_REQUEST = 'LOAD_BIBS_REQUEST';
export const LOAD_BIBS_RESULT = 'LOAD_BIBS_RESULT';
export const LOAD_RESULTS_REQUEST = 'LOAD_RESULTS_REQUEST';
export const LOAD_RESULTS_RESULT = 'LOAD_RESULTS_RESULT';
export const ON_CHANGE_SEARCH_TARGET = 'ON_CHANGE_SEARCH_TARGET';
export const SUGGEST_ON_CHANGE = 'SUGGEST_ON_CHANGE';
export const SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED';
export const SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED';
export const SUGGEST_ON_SUGGESTION_SELECTED = 'SUGGEST_ON_SUGGESTION_SELECTED';

export const SUGGEST_ON_KEY_PRESS = 'SUGGEST_ON_KEY_PRESS';

function searchPlayers(value) {
  return {
    type: SUGGEST_ON_KEY_PRESS,
    value,
  };
}

export function suggestOnKeyPress(event, value) {
  if (event.which === 13) {
    return (dispatch) => {
      Axios.get(`/api/v1/players.json?name=${value}`).then(
        response => dispatch(searchPlayers(response.data)),
      ).catch(
        response => console.log(response),
      );
    };
  }
  return { type: null };
}

function loadResultResult(value) {
  return {
    type: SUGGEST_ON_SUGGESTION_SELECTED,
    value,
  };
}

function getResultAPIPath(value, searchTarget) {
  let cond = null;
  switch (searchTarget) {
    case OMM_CONST.SEARCH_TARGETS.BIB:
      cond = 'bib';
      break;
    case OMM_CONST.SEARCH_TARGETS.PLAYER:
      cond = 'player';
      break;
    default:
      cond = 'bib';
      break;
  }

  return `/api/v1/results.json?${cond}=${value}`;
}

export function onSuggestionSelected(value, searchTarget) {
  const apiPath = getResultAPIPath(value, searchTarget);
  return (dispatch) => {
    Axios.get(apiPath).then(
      response => dispatch(loadResultResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

export function addCompareResult(value) {
  return onSuggestionSelected(value, OMM_CONST.SEARCH_TARGETS.BIB);
}

export function deleteCompareResult(bib) {
  return {
    type: DELETE_COMPARE_RESULT,
    bib,
  };
}

export function onChangeSearchTarget(value) {
  return {
    type: ON_CHANGE_SEARCH_TARGET,
    value,
  };
}

export function onChange(value) {
  return {
    type: SUGGEST_ON_CHANGE,
    value,
  };
}

export function onSuggestionsFetchRequested(value, results) {
  return {
    type: SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
    value: value.value,
    results,
  };
}

export function onSuggestionsClearRequested() {
  return {
    type: SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED,
  };
}

function loadBibsRequest() {
  return {
    type: LOAD_BIBS_REQUEST,
  };
}

function loadBibsResult(value) {
  return {
    type: LOAD_BIBS_RESULT,
    value,
  };
}

export function loadBibs() {
  return (dispatch) => {
    dispatch(loadBibsRequest());

    Axios.get('/api/v1/bibs.json').then(
      response => dispatch(loadBibsResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

function loadPlayersRequest() {
  return {
    type: LOAD_PLAYERS_REQUEST,
  };
}

function loadPlayersResult(value) {
  return {
    type: LOAD_PLAYERS_RESULT,
    value,
  };
}

export function loadPlayers() {
  return (dispatch) => {
    dispatch(loadPlayersRequest());

    Axios.get('/api/v1/players.json').then(
      response => dispatch(loadPlayersResult(response.data)),
    ).catch(
      response => console.log(response),
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

export function loadControls() {
  return (dispatch) => {
    dispatch(loadControlsRequest());

    Axios.get('/api/v1/controls.json').then(
      response => dispatch(loadControlsResult(response.data)),
    ).catch(
      response => console.log(response),
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
    result,
  };
}

export function loadResults() {
  return (dispatch) => {
    dispatch(loadResultsRequest());

    Axios.get('/api/v1/results.json').then(
      response => dispatch(loadResultsResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}
