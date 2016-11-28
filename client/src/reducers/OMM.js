import * as OMM from '../actions/OMM';
import * as OMM_CONST from '../constants/OMM';

function getResult(bib, results) {
	let result = results.filter(r =>
		r.bib === Number(bib)
	);
	return result;
}

function getGridWidthObject(results) {
  let length = results.length;
  if (length === 0) return [ 2, 10 ];
  if (1 <= length || legnth <= 4) return [ 3, 9 ];
  if (5 <= length || legnth <= 7) return [ 5, 7 ];
  return [ 7, 5 ];
}

function getGridWidth(results) {
  let [ controlsTable, map ] = getGridWidthObject(results);
  return { controlsTable, map };
}

function getSuggestions(value, results) {
  let inputValue = value.toString();
  let inputLength = inputValue.length;

  let resultBibs = results.map(result =>
    result.bib.toString()
  );
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

function getBibControlsMap(results) {
  let bibControlsMap = new Map();
  for (let result of results) {
    let controls = result.controls;
    let path = controls.map(control => {
      return {
        lat: control.lat,
        lng: control.lng,
      }
    });
    path.push(OMM_CONST.START_POINT);
    path.unshift(OMM_CONST.FINISH_POINT);

    let routepath = {
      path,
      geodesic: true,
      strokecolor: '#ff0000',
      strokeopacity: 1.0,
      strokeweight: 2
    }
    bibControlsMap.set(result.bib, routepath);
  }
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
    controlsTable: 2,
    map: 10
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
        suggestions: getSuggestions(action.value, state.allResults),
      });
    case OMM.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED:
      return Object.assign({}, state, {
        suggestions: []
      });
    case OMM.SUGGEST_ON_SUGGESTION_SELECTED:
      let result = getResult(action.value, state.allResults);
      return Object.assign({}, state, {
        value: '',
        compareResults: state.compareResults.concat(result),
        gridWidth: getGridWidth(result),
      });

    case OMM.LOAD_RESULTS:
      return {};
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
        bibControlsMap: getBibControlsMap(action.result),
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
