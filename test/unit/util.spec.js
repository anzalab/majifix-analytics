import { expect } from 'chai';
import {
  normalizeTime,
  normalizeMetricTimes,
  prepareReportResponse,
  getFacet,
} from '../../src/util';

describe('Utils', () => {
  const fakeResults = {
    overall: {
      count: 1,
      pending: 20,
      resolved: 10,
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
      lateTime: {
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
      resolveTime: {
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
      callTime: {
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
      workTime: {
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
        pending: 20,
        resolved: 10,
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
        lateTime: {
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
        resolveTime: {
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
        callTime: {
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
        workTime: {
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
    ],
    workspaces: [{ name: 'Call', count: 1 }],
  };

  describe('normalizeTime', () => {
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
  });

  describe('normalizeMetricTimes', () => {
    it('should normalize metrics times and restructure object results', () => {
      const aggregationResult = {
        count: 1,
        pending: 20,
        resolved: 10,
        maximumAssignTime: null,
        minimumAssignTime: null,
        averageAssignTime: null,
        maximumAttendTime: 0,
        minimumAttendTime: 0,
        averageAttendTime: 0,
        maximumCompleteTime: 0,
        minimumCompleteTime: 0,
        averageCompleteTime: 0,
        maximumVerifyTime: 0,
        minimumVerifyTime: 0,
        averageVerifyTime: 0,
        maximumApproveTime: 0,
        minimumApproveTime: 0,
        averageApproveTime: 0,
        maximumResolveTime: 0,
        minimumResolveTime: 0,
        averageResolveTime: 0,
        maximumLateTime: 0,
        minimumLateTime: 0,
        averageLateTime: 0,
        maximumConfirmTime: 0,
        minimumConfirmTime: 0,
        averageConfirmTime: 0,
        maximumCallTime: 0,
        minimumCallTime: 0,
        averageCallTime: 0,
        maximumWorkTime: 0,
        minimumWorkTime: 0,
        averageWorkTime: 0,
      };

      const expectedOutput = fakeResults.overall;

      expect(normalizeMetricTimes(aggregationResult)).to.be.eql(expectedOutput);
    });
  });

  describe('prepareReportResponse', () => {
    it('should handle aggregation results with empty facet keys', () => {
      const aggregationResults = [{ items: [] }, { services: [] }];
      const expectedOutput = {
        data: {
          items: [],
          services: [],
        },
      };

      expect(prepareReportResponse(aggregationResults)).to.be.eql(
        expectedOutput
      );
    });

    it('should normalize aggregation results to response format', () => {
      const aggregationResults = [
        {
          overall: [
            {
              count: 1,
              pending: 20,
              resolved: 10,
              maximumAssignTime: null,
              minimumAssignTime: null,
              averageAssignTime: null,
              maximumAttendTime: 0,
              minimumAttendTime: 0,
              averageAttendTime: 0,
              maximumCompleteTime: 0,
              minimumCompleteTime: 0,
              averageCompleteTime: 0,
              maximumVerifyTime: 0,
              minimumVerifyTime: 0,
              averageVerifyTime: 0,
              maximumApproveTime: 0,
              minimumApproveTime: 0,
              averageApproveTime: 0,
              maximumResolveTime: 0,
              minimumResolveTime: 0,
              averageResolveTime: 0,
              maximumLateTime: 0,
              minimumLateTime: 0,
              averageLateTime: 0,
              maximumConfirmTime: 0,
              minimumConfirmTime: 0,
              averageConfirmTime: 0,
              maximumCallTime: 0,
              minimumCallTime: 0,
              averageCallTime: 0,
              maximumWorkTime: 0,
              minimumWorkTime: 0,
              averageWorkTime: 0,
            },
          ],
          jurisdictions: [
            {
              count: 1,
              name: 'Area',
              pending: 20,
              resolved: 10,
              maximumAssignTime: null,
              minimumAssignTime: null,
              averageAssignTime: null,
              maximumAttendTime: 0,
              minimumAttendTime: 0,
              averageAttendTime: 0,
              maximumCompleteTime: 0,
              minimumCompleteTime: 0,
              averageCompleteTime: 0,
              maximumVerifyTime: 0,
              minimumVerifyTime: 0,
              averageVerifyTime: 0,
              maximumApproveTime: 0,
              minimumApproveTime: 0,
              averageApproveTime: 0,
              maximumResolveTime: 0,
              minimumResolveTime: 0,
              averageResolveTime: 0,
              maximumLateTime: 0,
              minimumLateTime: 0,
              averageLateTime: 0,
              maximumConfirmTime: 0,
              minimumConfirmTime: 0,
              averageConfirmTime: 0,
              maximumCallTime: 0,
              minimumCallTime: 0,
              averageCallTime: 0,
              maximumWorkTime: 0,
              minimumWorkTime: 0,
              averageWorkTime: 0,
            },
          ],
          workspaces: [{ name: 'Call', count: 1 }],
        },
      ];

      const expectedOutput = { data: fakeResults };

      expect(prepareReportResponse(aggregationResults)).to.be.eql(
        expectedOutput
      );
    });
  });

  describe('getFacet', () => {
    const defaultFacet = {
      overall: [{ a: 1 }],
      services: [{ b: 2 }],
    };
    it('should return new facet with only selected keys', () => {
      expect(getFacet(defaultFacet, ['overall'])).to.be.eql({
        overall: [{ a: 1 }],
      });
    });

    it('should return default facet when provided key is not part of default facet', () => {
      expect(getFacet(defaultFacet, ['statuses'])).to.eql(defaultFacet);
    });

    it('should return default facet when no key is provided', () => {
      expect(getFacet(defaultFacet, [])).to.eql(defaultFacet);
    });
  });
});
