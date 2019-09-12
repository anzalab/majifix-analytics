import { expect } from 'chai';
import {
  normalizeTime,
  normalizeObjectTimes,
  prepareReportResponse,
} from '../../src/util';

describe('Utils', () => {
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

  it('should handle null value input', () => {
    const expectedOutput = {
      days: 0,
      hours: 0,
      microseconds: 0,
      milliseconds: 0,
      minutes: 0,
      nanoseconds: 0,
      seconds: 0,
    };

    expect(normalizeTime(null)).to.be.eql(expectedOutput);
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
        time: [
          {
            maximumAssignTime: null,
            minimumAssignTime: null,
            averageAssignTime: null,
            maximumAttendTime: 7813,
            minimumAttendTime: 7813,
            averageAttendTime: 7813,
            maximumCompleteTime: 0,
            minimumCompleteTime: 0,
            averageCompleteTime: 0,
            maximumVerifyTime: 0,
            minimumVerifyTime: 0,
            averageVerifyTime: 0,
            maximumApproveTime: 0,
            minimumApproveTime: 0,
            averageApproveTime: 0,
            maximumResolveTime: 79624349,
            minimumResolveTime: 18750,
            averageResolveTime: 29821770.333333332,
            maximumLateTime: 72424414,
            minimumLateTime: 72424414,
            averageLateTime: 72424414,
            maximumConfirmTime: 7199946,
            minimumConfirmTime: 7199946,
            averageConfirmTime: 7199946,
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
          approveTime: {
            average: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            maximum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
          },
          assignTime: {
            average: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            maximum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
          },
          attendTime: {
            average: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 813,
              minutes: 0,
              nanoseconds: 0,
              seconds: 7,
            },
            maximum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 813,
              minutes: 0,
              nanoseconds: 0,
              seconds: 7,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 813,
              minutes: 0,
              nanoseconds: 0,
              seconds: 7,
            },
          },
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
          completeTime: {
            average: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            maximum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
          },
          confirmTime: {
            average: {
              days: 0,
              hours: 1,
              microseconds: 0,
              milliseconds: 946,
              minutes: 59,
              nanoseconds: 0,
              seconds: 59,
            },
            maximum: {
              days: 0,
              hours: 1,
              microseconds: 0,
              milliseconds: 946,
              minutes: 59,
              nanoseconds: 0,
              seconds: 59,
            },
            minimum: {
              days: 0,
              hours: 1,
              microseconds: 0,
              milliseconds: 946,
              minutes: 59,
              nanoseconds: 0,
              seconds: 59,
            },
          },
          count: 1,
          lateTime: {
            average: {
              days: 0,
              hours: 20,
              microseconds: 0,
              milliseconds: 414,
              minutes: 7,
              nanoseconds: 0,
              seconds: 4,
            },
            maximum: {
              days: 0,
              hours: 20,
              microseconds: 0,
              milliseconds: 414,
              minutes: 7,
              nanoseconds: 0,
              seconds: 4,
            },
            minimum: {
              days: 0,
              hours: 20,
              microseconds: 0,
              milliseconds: 414,
              minutes: 7,
              nanoseconds: 0,
              seconds: 4,
            },
          },
          pending: 20,
          resolveTime: {
            average: {
              days: 0,
              hours: 8,
              microseconds: 333,
              milliseconds: 770,
              minutes: 17,
              nanoseconds: 333,
              seconds: 1,
            },
            maximum: {
              days: 0,
              hours: 22,
              microseconds: 0,
              milliseconds: 349,
              minutes: 7,
              nanoseconds: 0,
              seconds: 4,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 750,
              minutes: 0,
              nanoseconds: 0,
              seconds: 18,
            },
          },
          verifyTime: {
            average: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            maximum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
            minimum: {
              days: 0,
              hours: 0,
              microseconds: 0,
              milliseconds: 0,
              minutes: 0,
              nanoseconds: 0,
              seconds: 0,
            },
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
