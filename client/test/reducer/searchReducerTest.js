import assert from 'assert';
import * as actions from '../../src/actions/search';
import reducer from '../../src/reducers/search';
import * as OMM_CONST from '../../src/constants/OMM';

describe('seach reducer', () => {
  describe('HOVER_RESULT_TABLE_ROW action type', () => {
    const controls = {
      path: [],
      options: {
        strokeWeight: 7,
        strokeOpacity: 0,
        strokeColor: '#000',
      }
    };
    const bibConfigMap = new Map();
    bibConfigMap.set(1, {
      controls,
      codes: [],
      color: '#ffffff',
    });
    bibConfigMap.set(2, {
      controls,
      codes: [],
      color: '#ffffff',
    });
    const actual = reducer(
      { bibConfigMap }, {
        type: actions.HOVER_RESULT_TABLE_ROW,
        value: 1,
      });
    describe('hover target', () => {
      const options = actual.bibConfigMap.get(1).controls.options;
      it('return target strokeOpacity', () => {
        assert.deepEqual(options.strokeOpacity,
          OMM_CONST.MAP_TARGET_OPTION.STROKE_OPACITY);
      });
      it('return target strokeWeight', () => {
        assert.deepEqual(options.strokeWeight,
                         OMM_CONST.MAP_TARGET_OPTION.STROKE_WEIGHT);
      });
      it('return target zIndex', () => {
        assert.deepEqual(options.zIndex,
                         OMM_CONST.MAP_TARGET_OPTION.Z_INDEX);
      });
    });
    describe('not hover target', () => {
      const options = actual.bibConfigMap.get(2).controls.options;
      it('return non-target strokeOpacity', () => {
        assert.deepEqual(options.strokeOpacity,
                         OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY);
      });
      it('return non-target strokeWeight', () => {
        assert.deepEqual(options.strokeWeight,
                         OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT);
      });
      it('return target zIndex', () => {
        assert.deepEqual(options.zIndex,
                         OMM_CONST.MAP_UN_TARGET_OPTION.Z_INDEX);
      });
    });
  });

  describe('OUT_RESULT_TABLE_ROW action type', () => {
    const bibConfigMap = new Map();

    // set target
    bibConfigMap.set(1, {
      controls: {
        path: [],
        options: {
          strokeWeight: OMM_CONST.MAP_TARGET_OPTION.STROKE_WEIGHT,
          strokeOpacity: OMM_CONST.MAP_TARGET_OPTION.STROKE_OPACITY,
          strokeColor: '#000',
          zIndex: OMM_CONST.MAP_TARGET_OPTION.Z_INDEX,
        }
      },
      codes: [],
      color: '#ffffff',
    });

    // set non-target
    bibConfigMap.set(2, {
      controls: {
        path: [],
        options: {
          strokeWeight: OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT,
          strokeOpacity: OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY,
          strokeColor: '#000',
          zIndex: OMM_CONST.MAP_UN_TARGET_OPTION.Z_INDEX,
        }
      },
      codes: [],
      color: '#ffffff',
    });

    const actual = reducer(
      { bibConfigMap }, {
        type: actions.OUT_RESULT_TABLE_ROW,
        value: 1,
      });
    describe('hovered target', () => {
      const options = actual.bibConfigMap.get(1).controls.options;
      it('return non-target strokeOpacity', () => {
        assert.deepEqual(options.strokeOpacity,
            OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY);
      });
      it('return non-target strokeWeight', () => {
        assert.deepEqual(options.strokeWeight,
            OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT);
      });
      it('return non-target zIndex', () => {
        assert.deepEqual(options.zIndex,
            OMM_CONST.MAP_UN_TARGET_OPTION.Z_INDEX);
      });
    });
    describe('not hovered target', () => {
      const options = actual.bibConfigMap.get(2).controls.options;
      it('return non-target strokeOpacity', () => {
        assert.deepEqual(options.strokeOpacity,
            OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_OPACITY);
      });
      it('return non-target strokeWeight', () => {
        assert.deepEqual(options.strokeWeight,
            OMM_CONST.MAP_UN_TARGET_OPTION.STROKE_WEIGHT);
      });
      it('return target zIndex', () => {
        assert.deepEqual(options.zIndex,
            OMM_CONST.MAP_UN_TARGET_OPTION.Z_INDEX);
      });
    });
  });

  it.skip('should handle HOVER_RESULT', () => {
    const controls = {
      path: [],
      options: {
        strokeWeight: 7,
        strokeOpacity: 0,
        strokeColor: '#000',
      }
    };
    const bibConfigMap = new Map();
    bibConfigMap.set(1, {
      controls,
      codes: [],
      color: '#ffffff',
    });

    const actual = reducer({ bibConfigMap }, {
      type: actions.HOVER_RESULT,
      value: '1',
    });
    const bibConfig = actual.bibConfigMap.get(1);
    const options = bibConfig.controls.options;
    assert.deepEqual(options.strokeOpacity, 1.0);
  });

  it('should handle LOAD_CONTROLS', () => {
    const actual = reducer(
        {},
        { type: actions.LOAD_CONTROLS }
      );
    const expected = { markers: [] };
    assert.deepEqual(actual, expected);
  });

  it('should handle LOAD_CONTROLS_REQUEST', () => {
    const actual = reducer(
        {},
        { type: actions.LOAD_CONTROLS_REQUEST }
      );
    const expected = {
      loading: true,
      loaded: false,
      markers: [],
    };
    assert.deepEqual(actual, expected);
  });

  it.skip('should handle LOAD_CONTROLS_RESULT', () => {
  });

  it('should handle CHANGE_DAY', () => {
    const actual = reducer(
       {
         selectedDay: OMM_CONST.DAYS.DAY1.CODE,
         compareResults: {
           controlsTable: 6,
           map: 6,
         },
         bibConfigMap: new Map(),
         markers: [100, 200],
       },
       {
         type: actions.CHANGE_DAY,
         value: OMM_CONST.DAYS.DAY2.CODE,
       });
    const expected = {
      selectedDay: OMM_CONST.DAYS.DAY2.CODE,
      compareResults: [],
      gridWidth: {
        controlsTable: 0,
        map: 12,
      },
      bibConfigMap: new Map(),
      markers: [],
    };
    assert.deepEqual(actual, expected);
  });

  it.skip('should handle LOAD_BIBS_REQUEST', () => {
    const actual = reducer({}, {
      type: actions.LOAD_BIBS_REQUEST,
    });
    const expected = {
      loading: false,
      loaded: true,
      bibs: [],
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle LOAD_BIBS_RESULT', () => {
    const actual = reducer({}, {
      type: actions.LOAD_BIBS_RESULT,
      value: [1, 2, 3],
    });
    const expected = {
      loading: false,
      loaded: true,
      bibs: [1, 2, 3],
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle ON_CHANGE_SEARCH_TARGET', () => {
    const actual = reducer(
      { value: '111' }, {
        type: actions.ON_CHANGE_SEARCH_TARGET,
        value: 'PLAYER',
      });
    const expected = {
      searchTarget: 'PLAYER',
      searchPlaceHolder: 'Type a player name',
      value: '111',
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle SUGGEST_ON_KEY_PRESS', () => {
    const actual = reducer(
      {
        pageCount: 3,
        pageOffset: 2,
        pageTotal: 0,
        pageLimit: 10
      }, {
        type: actions.SUGGEST_ON_KEY_PRESS,
        value: {
          total_count: 10,
          players: ['keyword'],
        },
        offset: 2,
      });
    const expected = {
      pageCount: 1,
      pageOffset: 2,
      pageTotal: 10,
      pageLimit: 10,
      searchPlayersResults: ['keyword'],
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle SUGGEST_ON_CHANGE', () => {
    const actual = reducer(
      {}, {
        type: actions.SUGGEST_ON_CHANGE,
        value: 'keyword',
      });
    const expected = {
      value: 'keyword',
      suggestions: [],
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED', () => {
    const actual = reducer(
      {
        searchTarget: OMM_CONST.SEARCH_TARGETS.BIB,
        bibs: [100, 101, 200, 201],
        compareResults: [
          { bib: 300 },
          { bib: 400 },
        ],
      }, {
        type: actions.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
        value: '1',
      });
    const expected = {
      searchTarget: OMM_CONST.SEARCH_TARGETS.BIB,
      bibs: [100, 101, 200, 201],
      suggestions: ['100', '101'],
      compareResults: [
        { bib: 300 },
        { bib: 400 },
      ],
    };
    assert.deepEqual(actual, expected);
  });

  it('should handle SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED', () => {
    const actual = reducer(
      {}, {
        type: actions.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED,
      });
    const expected = {
      suggestions: [],
    };
    assert.deepEqual(actual, expected);
  });

  it.skip('should handle SUGGEST_ON_SUGGESTION_SELECTED', () => {
    const actual = reducer(
      {}, {
        type: actions.SUGGEST_ON_SUGGESTION_SELECTED,
      });
    const expected = {
      suggestions: [],
    };
    assert.deepEqual(actual, expected);
  });

  describe('CHANGE_DISPLAY_ROUTE action type', () => {
    const bibConfigMap = new Map();
    bibConfigMap.set(1, {
      codes: [],
      color: '#ffffff',
      display: true,
    });
    bibConfigMap.set(2, {
      codes: [],
      color: '#ffffff',
      display: false,
    });
    it('display return false when true', () => {
      const actual = reducer(
        { bibConfigMap }, {
          type: actions.CHANGE_DISPLAY_ROUTE,
          bib: 1,
        }).bibConfigMap.get(1).display;
      assert.deepEqual(actual, false);
    });
    it('display return true when false', () => {
      const actual = reducer(
        { bibConfigMap }, {
          type: actions.CHANGE_DISPLAY_ROUTE,
          bib: 2,
        }).bibConfigMap.get(2).display;
      assert.deepEqual(actual, true);
    });
  });

  describe('SORT_RESULT_TABLE action type', () => {
    const compareResults = [
      { bib: 300, rank: 10 },
      { bib: 200, rank: 3 },
      { bib: 500, rank: 20 },
    ];
    it('return results sorted by rank asc and sortOrder is desc', () => {
      const actual = reducer(
        { compareResults }, {
          type: actions.SORT_RESULT_TABLE,
          sortBy: OMM_CONST.SORT_FIELDS.RANK,
          sortOrder: OMM_CONST.SORT_ORDER.ASC,
        });
      const expected = {
        compareResults: [
          { bib: 200, rank: 3 },
          { bib: 300, rank: 10 },
          { bib: 500, rank: 20 },
        ],
        sortOrder: OMM_CONST.SORT_ORDER.DESC,
      };
      assert.deepEqual(actual, expected);
    });

    it('return results sorted by rank desc and sortOrder is asc', () => {
      const actual = reducer(
        { compareResults }, {
          type: actions.SORT_RESULT_TABLE,
          sortBy: OMM_CONST.SORT_FIELDS.RANK,
          sortOrder: OMM_CONST.SORT_ORDER.DESC,
        });
      const expected = {
        compareResults: [
          { bib: 500, rank: 20 },
          { bib: 300, rank: 10 },
          { bib: 200, rank: 3 },
        ],
        sortOrder: OMM_CONST.SORT_ORDER.ASC,
      };
      assert.deepEqual(actual, expected);
    });
  });
});
