import { expect } from 'chai';
import {
  normalizeResultsForReports,
  normalizeResultsForAggregations,
  normalizeTime,
  normalizeObjectTimes,
  prepareReportResponse,
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

  it('should return human readable parsed object', () => {
    const timeInMilliseconds = 1000;
    const expectedOutput = {
      days: 0,
      hours: 0,
      microseconds: 0,
      milliseconds: 0,
      minutes: 0,
      nanoseconds: 0,
      seconds: 1,
    };

    expect(normalizeTime(timeInMilliseconds)).to.be.eql(expectedOutput);
  });

  it('should handle negative time inputs', () => {
    const timeInMilliseconds = -1000;
    const expectedOutput = {
      days: 0,
      hours: 0,
      microseconds: 0,
      milliseconds: 0,
      minutes: 0,
      nanoseconds: 0,
      seconds: 1,
    };

    expect(normalizeTime(timeInMilliseconds)).to.be.eql(expectedOutput);
  });

  it('should parse object times to human readable times', () => {
    const input = {
      count: 100,
      averageResolveTime: 1000,
      averageAttendTime: 2000,
    };
    const expectedOutput = {
      count: 100,
      averageAttendTime: {
        days: 0,
        hours: 0,
        microseconds: 0,
        milliseconds: 0,
        minutes: 0,
        nanoseconds: 0,
        seconds: 2,
      },
      averageResolveTime: {
        days: 0,
        hours: 0,
        microseconds: 0,
        milliseconds: 0,
        minutes: 0,
        nanoseconds: 0,
        seconds: 1,
      },
    };

    expect(normalizeObjectTimes(input)).to.be.eql(expectedOutput);
  });

  it('should normalize aggregration results to response format', () => {
    const aggregrationResults = [
      {
        overall: [
          {
            count: 1,
            pending: 20,
            averageAttendTime: 1000,
            averageResolveTime: 2000,
          },
        ],
        jurisdictions: [
          {
            count: 1,
            name: 'Area',
            averageAttendTime: 1000,
            averageResolveTime: 3000,
          },
        ],
        services: [
          {
            name: 'Service',
            count: 3,
            averageAttendTime: 5000,
            averageResolveTime: 4000,
          },
        ],
        workspaces: [{ name: 'Call', count: 1 }],
      },
    ];
    const expectedOutput = {
      data: {
        overall: {
          count: 1,
          pending: 20,
          averageAttendTime: {
            days: 0,
            hours: 0,
            microseconds: 0,
            milliseconds: 0,
            minutes: 0,
            nanoseconds: 0,
            seconds: 1,
          },
          averageResolveTime: {
            days: 0,
            hours: 0,
            microseconds: 0,
            milliseconds: 0,
            minutes: 0,
            nanoseconds: 0,
            seconds: 2,
          },
        },
        jurisdictions: [
          {
            count: 1,
            name: 'Area',
            averageAttendTime: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 1,
            },
            averageResolveTime: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 3,
            },
          },
        ],
        services: [
          {
            count: 3,
            name: 'Service',
            averageAttendTime: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 5,
            },
            averageResolveTime: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 4,
            },
          },
        ],
        workspaces: [{ name: 'Call', count: 1 }],
      },
    };

    expect(prepareReportResponse(aggregrationResults)).to.be.eql(
      expectedOutput
    );
  });
});
