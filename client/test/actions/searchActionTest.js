import assert from 'assert';
import * as searchActions from '../../src/actions/search';

describe('actions', () => {
  it('hoverOutResult', () => {
    const actual = searchActions.outResultTableRow();
    const expected = { type: searchActions.OUT_RESULT_TABLE_ROW };
    assert.deepEqual(actual, expected);
  });

  it('hoverResult', () => {
    const actual = searchActions.hoverResultTableRow('bib');
    const expected = {
      type: searchActions.HOVER_RESULT_TABLE_ROW,
      value: 'bib'
    };
    assert.deepEqual(actual, expected);
  });

  it('onChangeSearchTarget', () => {
    const actual = searchActions.onChangeSearchTarget('target');
    const expected = {
      type: searchActions.ON_CHANGE_SEARCH_TARGET,
      value: 'target'
    };
    assert.deepEqual(actual, expected);
  });
});
