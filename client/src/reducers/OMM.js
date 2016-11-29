import * as OMM from '../actions/OMM';
import * as OMM_CONST from '../constants/OMM';

/*
function getResult(result, bibs) {
	let result = bibs.filter(r =>
		r.bib === Number(bib)
	);
	return result;
}
*/

function getGridWidthObject(results) {
  let length = results.length;
  if (length === 0) return [ 0, 12 ];
  if (1 <= length || legnth <= 4) return [ 3, 9 ];
  if (5 <= length || legnth <= 7) return [ 5, 7 ];
  return [ 7, 5 ];
}

function getGridWidth(results) {
  let [ controlsTable, map ] = getGridWidthObject(results);
  return { controlsTable, map };
}

function getSuggestions(value, bibs) {
  let inputValue = value.toString();
  let inputLength = inputValue.length;

  let resultBibs = bibs.map(bib => bib.toString());
  return inputLength === 0 ? [] : resultBibs.filter(bib =>
    bib.slice(0, inputLength) === inputValue
  );
};

function getBibCodesMap(results) {
  let bibCodesMap = new Map();
  for (let result of results) {
    bibCodesMap.set(result.bib, result.controls.map(control => {
      return control.code;
    }));
  }
  return bibCodesMap;
};

function getBibControlsMap(result, bibControlsMap) {
  let controls = result.controls;
  let path = controls.map(control => {
    return {
      lat: control.lat,
      lng: control.lng,
    }
  });
  path.unshift(OMM_CONST.START_POINT);
  path.push(OMM_CONST.FINISH_POINT);

  let routepath = {
    path,
    geodesic: true,
    strokecolor: '#ff0000',
    strokeopacity: 1.0,
    strokeweight: 2
  }
  bibControlsMap.set(result.bib, routepath);
  return bibControlsMap;
}

function getControlsAndMarkers(data) {
  let controls = new Map();
  let markers = [];
  for (let control of data) {
    controls.set(control.code, control);
    markers.push({
      position: {
        lat: control.lat,
        lng: control.lng,
      },
      label: control.code.toString(),
      key: control.id
    });
  };
  return {controls, markers};
}

function getRoutesByResult(data) {
  let routes = new Map();
  let results = data.map(result => {
    let controls = result.controls;
    let path = controls.map(control => {
      return {
        lat: control.lat,
        lng: control.lng,
      };
    });

    let routepath = {
      path: path,
      geodesic: true,
      strokecolor: '#ff0000',
      strokeopacity: 1.0,
      strokeweight: 2
    }
    routes.set(result.id, routepath);
  });
  return routes;
}

function deleteComareResult(bib, results) {
  return results.filter(result => result.bib !== bib);
}

const initialState = {
  value: '',

  /* Array: [result, ...] */
  allResults: [],

  markers: [],
  compareResults: [],
  suggestions: [],

  /* Array: [bib, ...] */
  bibs: [],

  /* Map: result.bib => [control.code, ...] */
  bibCodesMap: new Map(),

  /* Map: result.bib => [control, ...] */
  bibControlsMap: new Map(),

  /* Map: control.code => control  */
  controls: new Map(),

  /* Object: { controlsTable: number,
   *           map: number }
   */
  gridWidth: {
    controlsTable: 0,
    map: 12
  },
};

export default function omm(state = initialState, action) {

  switch (action.type) {

    case OMM.SUGGEST_ON_CHANGE:
      return Object.assign({}, state, {
        value: action.value,
        suggestions: []
      });
    case OMM.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED:
      return Object.assign({}, state, {
        suggestions: getSuggestions(action.value, state.bibs),
      });
    case OMM.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED:
      return Object.assign({}, state, {
        suggestions: []
      });
    case OMM.SUGGEST_ON_SUGGESTION_SELECTED:
      let results = state.compareResults.concat(action.value);
      let codesByBib = action.value.controls.map(control => control.code);
      return Object.assign({}, state, {
        value: '',
        compareResults: results, 
        gridWidth: getGridWidth(results),
        bibCodesMap: state.bibCodesMap.set(action.value.bib, codesByBib),
        bibControlsMap: getBibControlsMap(action.value, state.bibControlsMap),
      });

    case OMM.LOAD_RESULTS:
      return {};
    case OMM.LOAD_BIBS:
      return Object.assign({}, state, {
        bibs: []
      });
    case OMM.LOAD_BIBS_REQUST:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        bibs: [],
      });
    case OMM.LOAD_BIBS_RESULT:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        bibs: action.value,
      });
    case OMM.LOAD_CONTROLS:
      return Object.assign({}, state, {
        markers: []
      });
    case OMM.LOAD_CONTROLS_REQUST:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        markers: [],
      });
    case OMM.LOAD_CONTROLS_RESULT:
      let { controls, markers } = getControlsAndMarkers(action.result);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        markers,
        controls,
      });
    case OMM.LOAD_RESULTS:
      return Object.assign({}, state, {
        allResults: []
      });
    case OMM.LOAD_RESULTS_REQUST:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        allResults: [],
      });
    case OMM.LOAD_RESULTS_RESULT:
      let allResults = getRoutesByResult(action.result);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        allResults: action.result,
        bibCodesMap: getBibCodesMap(action.result),
      });
    case OMM.DELETE_COMPARE_RESULT:
      let compareResults = deleteComareResult(action.bib, state.compareResults);
      return Object.assign({}, state, {
        compareResults,
        gridWidth: getGridWidth(compareResults),
      });
    default:
      return state;
  }
}
