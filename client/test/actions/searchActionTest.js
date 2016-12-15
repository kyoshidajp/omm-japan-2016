import assert from 'assert';
import * as searchActions from '../../src/actions/search';

describe('actions', () => {
  it('hoverOutResult', () => {
    const actual = searchActions.outResultTableRow();
    const expected = {type: searchActions.OUT_RESULT_TABLE_ROW}
    assert.deepEqual(actual, expected);
  });

  it('hoverResult', () => {
    const actual = searchActions.hoverResultTableRow('bib');
    const expected = {type: searchActions.HOVER_RESULT_TABLE_ROW,
                      value: 'bib'}
    assert.deepEqual(actual, expected);
  });
});
