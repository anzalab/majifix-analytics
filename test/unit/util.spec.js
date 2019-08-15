import { expect } from 'chai';
import {
  normalizeResultsForReports,
  normalizeResultsForAggregations,
} from '../../src/util';

describe('Utils', () => {
  it('should return response format object for report', () => {
    const input = [{ overall: [{ name: 'test' }], methods: [] }];
    const expectedOutput = { data: { overall: { name: 'test' }, methods: [] } };

    expect(normalizeResultsForReports(input)).to.be.eql(expectedOutput);
  });

  it('should return response format array for aggregration', () => {
    const input = [{ overall: [{ name: 'test' }], methods: [] }];
    const expectedOutput = { data: [...input] };

    expect(normalizeResultsForAggregations(input)).to.be.eql(expectedOutput);
  });
});
