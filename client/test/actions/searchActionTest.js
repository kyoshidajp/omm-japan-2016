import assert from 'assert';
import * as searchActions from '../../src/actions/search';

describe('actions', () => {
  it('handle changeDisplayRoute', () => {
    const actual = searchActions.changeDisplayRoute(100);
    const expected = { 
			type: searchActions.CHANGE_DISPLAY_ROUTE,
			bib: 100,
		};
    assert.deepEqual(actual, expected);
  });

  it('handle hoverResultTableRow', () => {
    const actual = searchActions.hoverResultTableRow(100);
    const expected = { 
			type: searchActions.HOVER_RESULT_TABLE_ROW,
			value: 100,
		};
    assert.deepEqual(actual, expected);
  });

  it('handle onChangeSearchTarget', () => {
    const actual = searchActions.onChangeSearchTarget('target');
    const expected = {
      type: searchActions.ON_CHANGE_SEARCH_TARGET,
      value: 'target'
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onChange', () => {
    const actual = searchActions.onChange('value');
    const expected = {
      type: searchActions.SUGGEST_ON_CHANGE,
      value: 'value'
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onSuggestionsFetchRequested', () => {
		const value = { value : 'value'};
    const actual = searchActions.onSuggestionsFetchRequested(value, ['results']);
    const expected = {
      type: searchActions.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
      value: value.value,
			results: ['results'],
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onSuggestionsClearRequested', () => {
    const actual = searchActions.onSuggestionsClearRequested();
    const expected = {
      type: searchActions.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED,
    };
    assert.deepEqual(actual, expected);
  });

  it('handle deleteCompareResult', () => {
    const actual = searchActions.deleteCompareResult(100);
    const expected = {
      type: searchActions.DELETE_COMPARE_RESULT,
			bib: 100,
    };
    assert.deepEqual(actual, expected);
  });
});
