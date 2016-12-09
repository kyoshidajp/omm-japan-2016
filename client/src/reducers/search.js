import * as OMM from '../actions/search';
import * as OMM_CONST from '../constants/OMM';

function getGridWidthObject(results) {
  const length = results.length;
  if (length === 0) return [0, 12];
  if (length >= 1 || length <= 4) return [3, 9];
  if (length >= 5 || length <= 7) return [5, 7];
  return [7, 5];
}

function getGridWidth(results) {
  const [controlsTable, map] = getGridWidthObject(results);
  return { controlsTable, map };
}

function getPlaceHolder(target) {
  switch (target) {
    case OMM_CONST.SEARCH_TARGETS.BIB:
      return OMM_CONST.SEARCH_PLACE_HOLDER.BIB;
    case OMM_CONST.SEARCH_TARGETS.PLAYER:
      return OMM_CONST.SEARCH_PLACE_HOLDER.PLAYER;
    default:
      return OMM_CONST.SEARCH_PLACE_HOLDER.BIB;
  }
}

function getSuggestions(value, state) {
  let provider = null;
  switch (state.searchTarget) {
    case OMM_CONST.SEARCH_TARGETS.BIB:
      provider = state.bibs;
      break;
    case OMM_CONST.SEARCH_TARGETS.PLAYER:
      provider = state.players;
      return [];
    default:
      provider = state.bibs;
      break;
  }
  const inputValue = value.toString();
  const inputLength = inputValue.length;

  const candidates = provider.map(item => item.toString());
  return inputLength === 0 ? [] : candidates.filter(item =>
    item.slice(0, inputLength) === inputValue,
  );
}

function getBibControlsMap(result, bibControlsMap) {
  const controls = result.controls;
  const path = controls.map((control) => {
    return {
      lat: control.lat,
      lng: control.lng,
    };
  });
  path.unshift(OMM_CONST.START_POINT);
  path.push(OMM_CONST.FINISH_POINT);

  const routepath = {
    path,
    geodesic: true,
    strokecolor: '#ff0000',
    strokeopacity: 1.0,
    strokeweight: 2,
  };
  bibControlsMap.set(result.bib, routepath);
  return bibControlsMap;
}

function deleteComareResult(bib, results) {
  return results.filter(result => result.bib !== bib);
}

const initialState = {
  searchTargets: [
    OMM_CONST.SEARCH_TARGETS.BIB,
    OMM_CONST.SEARCH_TARGETS.PLAYER,
  ],

  searchTarget: OMM_CONST.SEARCH_TARGETS.BIB,
  searchPlaceHolder: OMM_CONST.SEARCH_PLACE_HOLDER.BIB,

  /* Array: [player, ...] */
  searchPlayersResults: [],

  suggestions: [],
  value: '',

  /* Array: [bib, ...] */
  bibs: [],

  compareResults: [],

  /* Map: result.bib => [control.code, ...] */
  bibCodesMap: new Map(),

  /* Map: result.bib => [control, ...] */
  bibControlsMap: new Map(),

  /* Object: { controlsTable: number,
   *           map: number }
   */
  gridWidth: {
    controlsTable: 0,
    map: 12,
  },
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case OMM.LOAD_BIBS: {
      return Object.assign({}, state, {
        bibs: [],
      });
    }
    case OMM.LOAD_BIBS_REQUST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        bibs: [],
      });
    }
    case OMM.LOAD_BIBS_RESULT: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        bibs: action.value,
      });
    }
    case OMM.ON_CHANGE_SEARCH_TARGET: {
      return Object.assign({}, state, {
        searchTarget: action.value,
        searchPlaceHolder: getPlaceHolder(action.value),
        value: '',
      });
    }
    case OMM.SUGGEST_ON_KEY_PRESS: {
      return Object.assign({}, state, {
        searchPlayersResults: action.value,
      });
    }
    case OMM.SUGGEST_ON_CHANGE: {
      return Object.assign({}, state, {
        value: action.value,
        suggestions: [],
      });
    }
    case OMM.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED: {
      return Object.assign({}, state, {
        suggestions: getSuggestions(action.value, state),
      });
    }
    case OMM.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED: {
      return Object.assign({}, state, {
        suggestions: [],
      });
    }
    case OMM.SUGGEST_ON_SUGGESTION_SELECTED: {
      const results = state.compareResults.concat(action.value);
      const codesByBib = action.value.controls.map(control => control.code);
      return Object.assign({}, state, {
        value: '',
        searchPlayersResults: [],
        compareResults: results,
        gridWidth: getGridWidth(results),
        bibCodesMap: state.bibCodesMap.set(action.value.bib, codesByBib),
        bibControlsMap: getBibControlsMap(action.value, state.bibControlsMap),
      });
    }
    case OMM.DELETE_COMPARE_RESULT: {
      const compareResults = deleteComareResult(action.bib, state.compareResults);
      return Object.assign({}, state, {
        compareResults,
        gridWidth: getGridWidth(compareResults),
      });
    }
    default:
      return state;
  }
}
