import * as actions from '../actions/map';

function getBibCodesMap(results) {
  const bibCodesMap = new Map();
  results.forEach((result) => {
    bibCodesMap.set(result.bib, result.controls.map((control) => {
      return control.code;
    }));
  });
  return bibCodesMap;
}

const initialState = {

  /* Array: [result, ...] */
  allResults: [],

  /* Array: [player.name, ...] */
  players: [],
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_PLAYERS_RESULT: {
      return Object.assign({}, state, {
        players: action.value,
      });
    }
    case actions.LOAD_RESULTS_REQUST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        allResults: [],
      });
    }
    case actions.LOAD_RESULTS_RESULT: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        allResults: action.result,
        bibCodesMap: getBibCodesMap(action.result),
      });
    }
    default:
      return state;
  }
}
