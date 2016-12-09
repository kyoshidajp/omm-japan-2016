import Axios from 'axios';

export const LOAD_PLAYERS_REQUEST = 'LOAD_PLAYERS_REQUEST';
export const LOAD_PLAYERS_RESULT = 'LOAD_PLAYERS_RESULT';

export const LOAD_RESULTS_REQUEST = 'LOAD_RESULTS_REQUEST';
export const LOAD_RESULTS_RESULT = 'LOAD_RESULTS_RESULT';
export const LOAD_CONTROLS_REQUEST = 'LOAD_CONTROLS_REQUEST';
export const LOAD_CONTROLS_RESULT = 'LOAD_CONTROLS_RESULT';

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
