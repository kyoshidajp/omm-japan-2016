import assert from 'assert';
import * as actions from '../../src/actions/search';

describe('actions', () => {
  it('handle changeDisplayRoute', () => {
    const actual = actions.changeDisplayRoute(100);
    const expected = { 
			type: actions.CHANGE_DISPLAY_ROUTE,
			bib: 100,
		};
    assert.deepEqual(actual, expected);
  });

  it('handle hoverResultTableRow', () => {
    const actual = actions.hoverResultTableRow(100);
    const expected = { 
			type: actions.HOVER_RESULT_TABLE_ROW,
			value: 100,
		};
    assert.deepEqual(actual, expected);
  });

  it('handle onChangeSearchTarget', () => {
    const actual = actions.onChangeSearchTarget('target');
    const expected = {
      type: actions.ON_CHANGE_SEARCH_TARGET,
      value: 'target'
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onChange', () => {
    const actual = actions.onChange('value');
    const expected = {
      type: actions.SUGGEST_ON_CHANGE,
      value: 'value'
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onSuggestionsFetchRequested', () => {
		const value = { value : 'value'};
    const actual = actions.onSuggestionsFetchRequested(value, ['results']);
    const expected = {
      type: actions.SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
      value: value.value,
			results: ['results'],
    };
    assert.deepEqual(actual, expected);
  });

  it('handle onSuggestionsClearRequested', () => {
    const actual = actions.onSuggestionsClearRequested();
    const expected = {
      type: actions.SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED,
    };
    assert.deepEqual(actual, expected);
  });

  it('handle deleteCompareResult', () => {
    const actual = actions.deleteCompareResult(100);
    const expected = {
      type: actions.DELETE_COMPARE_RESULT,
			bib: 100,
    };
    assert.deepEqual(actual, expected);
  });
});
