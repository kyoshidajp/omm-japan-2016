import Axios from 'axios';

import * as OMM_CONST from '../constants/OMM';

export const ON_CHANGE_SEARCH_TARGET = 'ON_CHANGE_SEARCH_TARGET';
export const SUGGEST_ON_CHANGE = 'SUGGEST_ON_CHANGE';
export const SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED';
export const SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED';
export const SUGGEST_ON_SUGGESTION_SELECTED = 'SUGGEST_ON_SUGGESTION_SELECTED';
export const SUGGEST_ON_KEY_PRESS = 'SUGGEST_ON_KEY_PRESS';
export const LOAD_BIBS_REQUEST = 'LOAD_BIBS_REQUEST';
export const LOAD_BIBS_RESULT = 'LOAD_BIBS_RESULT';
export const DELETE_COMPARE_RESULT = 'DELETE_COMPARE_RESULT';
export const CHANGE_DAY = 'CHANGE_DAY';
export const LOAD_CONTROLS_REQUEST = 'LOAD_CONTROLS_REQUEST';
export const LOAD_CONTROLS_RESULT = 'LOAD_CONTROLS_RESULT';
export const HOVER_RESULT_TABLE_ROW = 'HOVER_RESULT_TABLE_ROW';
export const OUT_RESULT_TABLE_ROW = 'OUT_RESULT_TABLE_ROW';

export function hoverResultTableRow(bib) {
  return {
    type: HOVER_RESULT_TABLE_ROW,
    value: bib,
  };
}

export function outResultTableRow() {
  return {
    type: OUT_RESULT_TABLE_ROW,
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

export function loadControls(value) {
  return (dispatch) => {
    dispatch(loadControlsRequest());

    Axios.get(`/api/v1/controls.json?day=${value}`).then(
      response => dispatch(loadControlsResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

function changeDayDisplay(value) {
  return {
    type: CHANGE_DAY,
    value,
  };
}

export function changeDay(event) {
  const value = Number(event.target.value);
  return (dispatch) => {
    dispatch(loadControls(value));
    dispatch(changeDayDisplay(value));
  };
}

function getResultAPIPath(value, searchTarget, day) {
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

  return `/api/v1/results.json?${cond}=${value}&day=${day}`;
}

function loadResultResult(value) {
  return {
    type: SUGGEST_ON_SUGGESTION_SELECTED,
    value,
  };
}

export function onSuggestionSelected(value, searchTarget, day) {
  const apiPath = getResultAPIPath(value, searchTarget, day);
  return (dispatch) => {
    Axios.get(apiPath).then(
      response => dispatch(loadResultResult(response.data)),
    ).catch(
      response => console.log(response),
    );
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

export function deleteCompareResult(bib) {
  return {
    type: DELETE_COMPARE_RESULT,
    bib,
  };
}

export function addCompareResult(value, day) {
  return onSuggestionSelected(value, OMM_CONST.SEARCH_TARGETS.BIB, day);
}
