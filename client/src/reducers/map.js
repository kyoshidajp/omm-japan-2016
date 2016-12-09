import * as OMM from '../actions/map';

function getControlsAndMarkers(data) {
  const controls = new Map();
  const markers = [];
  data.forEach((control) => {
    controls.set(control.code, control);
    markers.push({
      position: {
        lat: control.lat,
        lng: control.lng,
      },
      label: control.code.toString(),
      key: control.id,
    });
  });
  return { controls, markers };
}

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

  /* Array: [marker, ...] */
  markers: [],

  /* Map: control.code => control  */
  controls: new Map(),

  /* Array: [result, ...] */
  allResults: [],

  /* Array: [player.name, ...] */
  players: [],
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case OMM.LOAD_CONTROLS: {
      return Object.assign({}, state, {
        markers: [],
      });
    }
    case OMM.LOAD_CONTROLS_REQUST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        markers: [],
      });
    }
    case OMM.LOAD_CONTROLS_RESULT: {
      const { controls, markers } = getControlsAndMarkers(action.result);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        markers,
        controls,
      });
    }
    case OMM.LOAD_PLAYERS_RESULT: {
      return Object.assign({}, state, {
        players: action.value,
      });
    }
    case OMM.LOAD_RESULTS_REQUST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        allResults: [],
      });
    }
    case OMM.LOAD_RESULTS_RESULT: {
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
