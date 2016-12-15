import assert from 'power-assert';
import * as searchActions from '../../src/actions/search';
import reducer from '../../src/reducers/search';

describe('reducer', () => {
  it('loadBibsResult', () => {
    const actual = reducer([], {
      type: searchActions.LOAD_BIBS_RESULT,
      value: [1, 2, 3],
    });
    const expected = {
      loading: false,
      loaded: true,
      bibs: [1, 2, 3],
    }
    assert.deepEqual(actual, expected);
  });

  it.skip('shold handle HOVER_RESULT', () => {
    let controls = {
      path: [],
      options: {
        strokeWeight: 7,
        strokeOpacity: 0,
        strokeColor: '#000',
      }
    }
    let bibConfigMap = new Map();
    bibConfigMap.set(1, {
      controls,
      codes: [],
      color: '#ffffff',
    });

    const actual = reducer({bibConfigMap}, {
      type: searchActions.HOVER_RESULT,
      value: '1',
    });
    const bibConfig = actual.bibConfigMap.get(1);
    const options = bibConfig.controls.options;
    assert.deepEqual(options.strokeOpacity, 1.0);
  });

  it('should handle ON_CHANGE_SEARCH_TARGET', () => {
    const actual = reducer(
		  { value: '111' }, {
        type: searchActions.ON_CHANGE_SEARCH_TARGET,
        value: 'PLAYER',
      });
    const expected = {
			searchTarget: 'PLAYER',
			searchPlaceHolder: 'Type a player name',
		  value: '111',
    }
    assert.deepEqual(actual, expected);
  });
});
