import * as actions from '../actions/search';
import * as OMM_CONST from '../constants/OMM';

function precedeRoute(targetBib, bibConfigMap) {
  for (const entry of bibConfigMap.entries()) {
    const [bib, bibConfig] = entry;
    const isTarget = targetBib !== null && targetBib === bib;
    const strokeOpacity = isTarget
      ? OMM_CONST.MAP_TARGET_OPTION.STROKE_OPACITY
      : OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY;
    const strokeWeight = isTarget
      ? OMM_CONST.MAP_TARGET_OPTION.STROKE_WEIGHT
      : OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT;
    const zIndex = isTarget
      ? OMM_CONST.MAP_TARGET_OPTION.Z_INDEX
      : OMM_CONST.MAP_UN_TARGET_OPTION.Z_INDEX;
    const options = {
      geodesic: true,
      strokeColor: bibConfig.color,
      strokeOpacity,
      strokeWeight,
      zIndex,
    };
    const routepath = {
      path: bibConfig.controls.path,
      options,
    };
    bibConfigMap.set(bib,
      {
        controls: routepath,
        codes: bibConfig.codes,
        color: bibConfig.color,
        display: bibConfig.display,
      });
  }
  return bibConfigMap;
}

function normalizeRoute(bibConfigMap) {
  return precedeRoute(null, bibConfigMap);
}

function getControlsAndMarkers(data, day) {
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
  let { startPoint, finishPoint } = [null, null];
  if (day === OMM_CONST.DAYS.DAY1.code) {
    startPoint = OMM_CONST.START_POINT.DAY1;
    finishPoint = OMM_CONST.FINISH_POINT.DAY1;
  } else if (day === OMM_CONST.DAYS.DAY2.code) {
    startPoint = OMM_CONST.START_POINT.DAY2;
    finishPoint = OMM_CONST.FINISH_POINT.DAY2;
  }
  markers.unshift({
    position: startPoint,
    label: OMM_CONST.START_POINT.LABEL,
    key: OMM_CONST.START_POINT.LABEL,
  });
  markers.push({
    position: finishPoint,
    label: OMM_CONST.FINISH_POINT.LABEL,
    key: OMM_CONST.FINISH_POINT.LABEL,
  });
  return { controls, markers };
}

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

  if (inputLength === 0) return [];

  const candidates = provider.map(item => item.toString());
  const displayedBibs = state.compareResults.map(result => result.bib);

  // TODO:
  //    when use
  //      !displayedBibs.includes(Number(item))
  //    instead of
  //      displayedBibs.indexOf(Number(item)) === -1
  //    failed at test
  return candidates.filter(item =>
    item.slice(0, inputLength) === inputValue &&
      displayedBibs.indexOf(Number(item)) === -1,
  );
}

function getRandomColor() {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const randomColorNum = Math.floor(Math.random() * 255);
    const randomColorString = `0${randomColorNum.toString(16)}`.slice(-2);
    color = `${color}${randomColorString}`;
  }
  return color;
}

function getColorByBib(bib, bibConfigMap) {
  let color = null;
  if (bibConfigMap.has(bib) && bibConfigMap.get(bib).color) {
    color = bibConfigMap.get(bib).color;
  } else {
    color = getRandomColor();
  }
  return color;
}

function getBibControlsMap(result, bibConfigMap, day) {
  const controls = result.controls;
  const path = controls.map((control) => {
    return {
      lat: control.lat,
      lng: control.lng,
    };
  });
  let { startPoint, finishPoint } = [null, null];
  if (day === OMM_CONST.DAYS.DAY1.code) {
    startPoint = OMM_CONST.START_POINT.DAY1;
    finishPoint = OMM_CONST.FINISH_POINT.DAY1;
  } else if (day === OMM_CONST.DAYS.DAY2.code) {
    startPoint = OMM_CONST.START_POINT.DAY2;
    finishPoint = OMM_CONST.FINISH_POINT.DAY2;
  }
  path.unshift(startPoint);
  path.push(finishPoint);

  const color = getColorByBib(result.bib, bibConfigMap);
  const options = {
    geodesic: true,
    strokeColor: color,
    strokeOpacity: OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY,
    strokeWeight: OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT,
  };

  const routepath = {
    path,
    options,
  };
  const codes = result.controls.map(control => control.code);
  bibConfigMap.set(result.bib,
    {
      controls: routepath,
      display: true,
      codes,
      color,
    });
  return bibConfigMap;
}

function deleteComareResult(bib, results) {
  return results.filter(result => result.bib !== bib);
}

function isSortField(field) {
  // if use Object.values and includes, then raise error at test
  const values = Object.keys(OMM_CONST.SORT_FIELDS).map(key => OMM_CONST.SORT_FIELDS[key]);
  return values.indexOf(field) !== -1;
}

function sortComareResult(results, sortBy, sortOrder) {
  // check can sort or not
  if (!isSortField(sortBy)) {
    console.error(`Unsupport sort field: ${sortBy}`);
    return results;
  }

  if (sortOrder === OMM_CONST.SORT_ORDER.DESC) {
    results.sort((result1, result2) => {
      if (result1[sortBy] < result2[sortBy]) return 1;
      if (result1[sortBy] > result2[sortBy]) return -1;
      return 0;
    });
  } else if (sortOrder === OMM_CONST.SORT_ORDER.ASC) {
    results.sort((result1, result2) => {
      if (result1[sortBy] < result2[sortBy]) return -1;
      if (result1[sortBy] > result2[sortBy]) return 1;
      return 0;
    });
  }
  return results;
}

function getPageCount(totalCount, limit) {
  return Math.ceil(totalCount / limit);
}

function switchSortOrder(sortOrder) {
  if (sortOrder === OMM_CONST.SORT_ORDER.DESC) {
    return OMM_CONST.SORT_ORDER.ASC;
  }
  if (sortOrder === OMM_CONST.SORT_ORDER.ASC) {
    return OMM_CONST.SORT_ORDER.DESC;
  }

  console.warn(`Unknown sortOrder: ${sortOrder}`);
  return OMM_CONST.SORT_ORDER.DESC;
}

function getPageOffset(offset, perPage) {
  return Math.ceil(offset * perPage);
}

const initialState = {
  searchTargets: [
    OMM_CONST.SEARCH_TARGETS.BIB,
    OMM_CONST.SEARCH_TARGETS.PLAYER,
  ],

  sortOrder: OMM_CONST.SORT_ORDER.DESC,
  searchTarget: OMM_CONST.SEARCH_TARGETS.BIB,
  searchPlaceHolder: OMM_CONST.SEARCH_PLACE_HOLDER.BIB,

  /* Array: [player, ...] */
  searchPlayersResults: [],

  suggestions: [],
  value: '',

  /* Array: [bib, ...] */
  bibs: [],

  compareResults: [],

  /* Map: result.bib => {
   *        controls: [control.code, ...],
   *        codes: [control, ...],
   *        color,
   *        display,
   *      }
   */
  bibConfigMap: new Map(),

  /* Object: { controlsTable: number,
   *           map: number }
   */
  gridWidth: {
    controlsTable: 0,
    map: 12,
  },

  selectedDay: OMM_CONST.DAYS.DAY1.code,

  /* Array: [marker, ...] */
  markers: [],

  /* Map: control.code => control  */
  controls: new Map(),

  /* for pagenation */
  pageCount: 0,
  pageOffset: 1,
  pageLimit: OMM_CONST.SEARCH_LIMIT_PER_PAGE,
  pageTotal: 0,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case actions.HOVER_RESULT_TABLE_ROW: {
      return Object.assign({}, state, {
        bibConfigMap: precedeRoute(action.value, state.bibConfigMap),
      });
    }
    case actions.OUT_RESULT_TABLE_ROW: {
      return Object.assign({}, state, {
        bibConfigMap: normalizeRoute(state.bibConfigMap),
      });
    }
    case actions.LOAD_CONTROLS: {
      return Object.assign({}, state, {
        markers: [],
      });
    }
    case actions.LOAD_CONTROLS_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        markers: [],
      });
    }
    case actions.LOAD_CONTROLS_RESULT: {
      const { controls, markers } = getControlsAndMarkers(action.result, state.selectedDay);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        markers,
        controls,
      });
    }
    case actions.CHANGE_DAY: {
      return Object.assign({}, state, {
        selectedDay: action.value,
        // initialize
        compareResults: [],
        gridWidth: getGridWidth([]),
        bibConfigMap: new Map(),
        markers: [],
      });
    }
    case actions.LOAD_BIBS: {
      return Object.assign({}, state, {
        bibs: [],
      });
    }
    case actions.LOAD_BIBS_REQUST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        bibs: [],
      });
    }
    case actions.LOAD_BIBS_RESULT: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        bibs: action.value,
      });
    }
    case actions.ON_CHANGE_SEARCH_TARGET: {
      return Object.assign({}, state, {
        searchTarget: action.value,
        searchPlaceHolder: getPlaceHolder(action.value),
      });
    }
    case actions.SUGGEST_ON_KEY_PRESS: {
      const pageCount = getPageCount(action.value.total_count, state.pageLimit);
      return Object.assign({}, state, {
        searchPlayersResults: action.value.players,
        pageTotal: action.value.total_count,
        pageCount,
        pageOffset: action.offset,
      });
    }
    case actions.SUGGEST_ON_CHANGE: {
      return Object.assign({}, state, {
        value: action.value,
        suggestions: [],
      });
    }
    case actions.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED: {
      return Object.assign({}, state, {
        suggestions: getSuggestions(action.value, state),
      });
    }
    case actions.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED: {
      return Object.assign({}, state, {
        suggestions: [],
      });
    }
    case actions.SUGGEST_ON_SUGGESTION_SELECTED: {
      const results = state.compareResults.concat(action.value);
      const bibConfigMap = getBibControlsMap(action.value, state.bibConfigMap, state.selectedDay);
      return Object.assign({}, state, {
        value: '',
        searchPlayersResults: [],
        compareResults: results,
        gridWidth: getGridWidth(results),
        bibConfigMap,
      });
    }
    case actions.DELETE_COMPARE_RESULT: {
      const compareResults = deleteComareResult(action.bib, state.compareResults);
      return Object.assign({}, state, {
        compareResults,
        gridWidth: getGridWidth(compareResults),
      });
    }
    case actions.CHANGE_DISPLAY_ROUTE: {
      const bibConfig = state.bibConfigMap.get(action.bib);
      bibConfig.display = !bibConfig.display;
      return Object.assign({}, state, {
        bibConfigMap: state.bibConfigMap.set(action.bib, bibConfig),
      });
    }
    case actions.SORT_RESULT_TABLE: {
      const sortOrder = switchSortOrder(action.sortOrder);
      const compareResults = sortComareResult(state.compareResults,
                                              action.sortBy,
                                              action.sortOrder);
      return Object.assign({}, state, {
        compareResults,
        sortOrder,
      });
    }
    case actions.ON_PAGE_CHANGE: {
      const pageOffset = getPageOffset(action.value, action.offset);
      return Object.assign({}, state, {
        pageOffset,
      });
    }
    default:
      return state;
  }
}
