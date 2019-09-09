import { pkg } from '@lykmapipo/common';
import { head, map, isNumber, merge } from 'lodash';
import { Router } from '@lykmapipo/express-common';
import { getString } from '@lykmapipo/env';
import parallel from 'async/parallel';
import { model } from '@lykmapipo/mongoose-common';
import parseMs from 'parse-ms';

/**
 * Base aggregation for service requests
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 *
 * @version 0.1.0
 * @since 0.1.0
 */

/**
 * @function
 * @name getBaseAggregation
 * @description Create base aggregation for Service Requests with all fields
 * looked up and un-winded for aggregation operations
 *
 * Also this adds more fields to aid in computation of aggregated data
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} aggregation instance
 *
 * @version 0.2.0
 * @since 0.1.0
 */
const getBaseAggregation = criteria => {
  const ServiceRequest = model('ServiceRequest');

  return ServiceRequest.lookup(criteria)
    .addFields({
      /**
       * Time difference between expected time to resolve the service request
       * and today.
       *
       * This time will indicate if the service request is late or not base on
       * the SLA(Service Level Agreement) time set per service request nature
       */
      lateTime: { $subtract: ['$expectedAt', new Date()] },

      /**
       * This is the time for a confirmed service request to be assigned to
       * a responsible party
       */
      assignTime: { $subtract: ['$assignedAt', '$confirmedAt'] },

      /**
       * This is the time for a assigned service request to be attended
       */
      attendTime: { $subtract: ['$attendedAt', '$assignedAt'] },

      /**
       * This is the time for a attended service request to be completed
       */
      completeTime: { $subtract: ['$completedAt', '$attendedAt'] },

      /**
       * This is the time for a completed service request to be verified
       */
      verifyTime: { $subtract: ['$verifiedAt', '$completedAt'] },

      /**
       * This is the time for a verified service request to be approved
       */
      approveTime: { $subtract: ['$approvedAt', '$verifiedAt'] },

      /**
       * This is the time for an approved service request to be marked as resolved
       */
      resolveTime: { $subtract: ['$resolvedAt', '$createdAt'] },
    })
    .addFields({
      /**
       * Flag for unconfirmed service request. This shows all service requests
       * which have been reporting via mobileApp, website, USSD and still they
       * are not confirmed yet by an operator.
       *
       * A service request is flagged as unconfirmed service request when it
       * has not been confirmed or resolved yet.
       */
      unconfirmed: {
        $cond: {
          if: { $and: [{ $not: '$resolvedAt' }, { $not: '$confirmedAt' }] },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for new service request. i.e open service request.
       *
       * A service request is flagged as new service request when it
       * has been confirmed but not assigned, attended,completed, verified,
       * approved, reopened or resolved yet.
       */
      new: {
        $cond: {
          if: {
            $and: [
              '$confirmedAt',
              { $not: '$resolvedAt' },
              { $not: '$assignedAt' },
              { $not: '$attendedAt' },
              { $not: '$completedAt' },
              { $not: '$verifiedAt' },
              { $not: '$approvedAt' },
              { $not: '$reopenedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for assigned service request. i.e assigned to someone.
       *
       * A service request is flagged as assigned service request when it
       * has been assigned but not attended or resolved yet.
       */
      assigned: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$assignedAt',
              { $not: '$attendedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for attended service request. i.e someone is attending the service request.
       *
       * A service request is flagged as attended service request when it
       * has been assigned and attended but not completed or resolved yet.
       */
      attended: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$assignedAt',
              '$attendedAt',
              { $not: '$completedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for completed service request. i.e someone have finished working
       * on the service request.
       *
       * A service request is flagged as completed service request when it
       * has been attended and completed but not verified or resolved yet.
       */
      completed: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$attendedAt',
              '$completedAt',
              { $not: '$verifiedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for verified service request. i.e someone have verified the
       * service request.
       *
       * A service request is flagged as verified service request when it
       * has been completed and verified but not approved or resolved yet.
       */
      verified: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$completedAt',
              '$verifiedAt',
              { $not: '$approvedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for approved service request. i.e someone have approved the
       * service request.
       *
       * A service request is flagged as approved service request when it
       * has been verified and approved but not resolved yet.
       */
      approved: {
        $cond: {
          if: {
            $and: [{ $not: '$resolvedAt' }, '$verifiedAt', '$approvedAt'],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for pending service request i.e service request which is confirmed but
       * not resolved yet
       *
       * A service request is flagged as pending service request when it
       * has been confirmed but not resolved yet.
       */
      pending: {
        $cond: {
          if: { $and: [{ $not: '$resolvedAt' }, '$confirmedAt'] },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for resovled service request i.e service request which is resolved
       *
       * A service request is flagged as resolved service request when it
       * has been resolved.
       */
      resolved: {
        $cond: { if: { $not: '$resolvedAt' }, then: 0, else: 1 },
      },

      /**
       * Flag for reopened service request i.e service request which have been
       * reopened after been resolved
       *
       * A service request is flagged as reopend service request when it
       * has been confirmed and reopened.
       */
      reopened: {
        $cond: {
          if: { $and: ['$reopenedAt', '$confirmedAt'] },
          then: 1,
          else: 0,
        },
      },
    });
};

/**
 * @namespace OVERALL_FACET
 * @description Facet for service requests overall general breakdown
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const OVERALL_FACET = {
  overall: [
    {
      $group: {
        _id: null,
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        unattended: {
          $sum: '$unattended',
        },
        late: { $sum: '$late' },
        count: { $sum: 1 },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ],
};

/**
 * @namespace PRIORITY_FACET
 * @description Facet for service requests breakdown based on their priorities
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const JURISDICTION_FACET = {
  jurisdictions: [
    {
      $group: {
        _id: '$jurisdiction._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unattended: { $sum: '$unattended' },
        name: { $first: '$jurisdiction.name' },
        email: { $first: '$jurisdiction.email' },
        phone: { $first: '$jurisdiction.phone' },
        color: { $first: '$jurisdiction.color' },
        count: { $sum: 1 },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 1,
        pending: 1,
        resolved: 1,
        late: 1,
        unattended: 1,
        name: 1,
        email: 1,
        phone: 1,
        color: 1,
        count: 1,
        averageResolveTime: 1,
        averageAttendTime: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ],
};

/**
 * @namespace STATUS_FACET
 * @description Facet for service requests breakdown based on their statuses
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const STATUS_FACET = {
  statuses: [
    {
      $group: {
        _id: '$status._id',
        name: { $first: '$status.name' },
        color: { $first: '$status.color' },
        weight: { $first: '$status.weight' },
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        weight: 1,
        color: 1,
        count: 1,
        pending: 1,
        resolved: 1,
      },
    },
    { $sort: { weight: 1 } },
  ],
};

/**
 * @namespace PRIORITY_FACET
 * @description Facet for service requests breakdown based on their priorities
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PRIORITY_FACET = {
  priorities: [
    {
      $group: {
        _id: '$group._id',
        name: { $first: '$group.name' },
        color: { $first: '$group.color' },
        weight: { $first: '$group.weight' },
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        unattended: { $sum: '$unattended' },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        color: 1,
        weight: 1,
        count: 1,
        pending: 1,
        resolved: 1,
        unattended: 1,
        averageResolveTime: 1,
        averageAttendTime: 1,
      },
    },
    {
      $sort: { name: 1 },
    },
  ],
};

/**
 * @namespace SERVICE_FACET
 * @description Facet for service requests breakdown based on their services(nature)
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SERVICE_FACET = {
  services: [
    {
      $group: {
        _id: '$service._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unattended: { $sum: '$unattended' },
        name: { $first: '$service.name' },
        color: { $first: '$service.color' },
        count: { $sum: 1 },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 1,
        pending: 1,
        resolved: 1,
        late: 1,
        unattended: 1,
        name: 1,
        color: 1,
        count: 1,
        averageResolveTime: 1,
        averageAttendTime: 1,
      },
    },
    {
      $sort: { name: 1 },
    },
  ],
};

/**
 * @namespace SERVICE_GROUP_FACET
 * @description Facet for service requests breakdown based on their service groups
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SERVICE_GROUP_FACET = {
  groups: [
    {
      $group: {
        _id: '$group._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unattended: { $sum: '$unattended' },
        name: { $first: '$group.name.en' },
        color: { $first: '$group.color' },
        count: { $sum: 1 },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 1,
        pending: 1,
        resolved: 1,
        late: 1,
        unattended: 1,
        name: 1,
        color: 1,
        count: 1,
        averageResolveTime: 1,
        averageAttendTime: 1,
      },
    },
    {
      $sort: { name: 1 },
    },
  ],
};

/**
 * @namespace SERVICE_TYPE_FACET
 * @description Facet for service requests breakdown based on their service types
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SERVICE_TYPE_FACET = {
  types: [
    {
      $group: {
        _id: '$type._id',
        name: { $first: '$type.name' },
        color: { $first: '$type.color' },
        code: { $first: '$type.code' },
        description: { $first: '$type.description' },
        abbreviation: { $first: '$type.abbreviation' },
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        unattended: { $sum: '$unattended' },
        late: { $sum: '$late' },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        color: 1,
        code: 1,
        description: 1,
        abbreviation: 1,
        count: 1,
        pending: 1,
        resolved: 1,
        unattended: 1,
        late: 1,
        averageAttendTime: 1,
        averageResolveTime: 1,
      },
    },
  ],
};

/**
 * This is overview report based on service request
 * It consist of
 *  - Total service requests per a given period
 *  - Pending service requests
 *  - Resolved service requests
 *  - Service requests breakdown based on their status
 *  - Service requests breakdown based on their priority
 *  - Service requests breakdown based on their nature/service
 *  - Service requests breakdown based on their service group
 *  - Service requests breakdown based on their workspace
 *  - Service requests breakdown based on their type
 *  - Service requests breakdown based on their reporting method
 *  - Service requests breakdown based on their areas/jurisdiction
 *
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.1.0
 */

const OVERVIEW_FACET = {
  ...OVERALL_FACET,
  ...JURISDICTION_FACET,
  ...STATUS_FACET,
  ...PRIORITY_FACET,
  // ...SERVICE_FACET,
  // ...SERVICE_GROUP_FACET,
  // ...SERVICE_TYPE_FACET,
  // ...WORKSPACE_FACET,
  // ...REPORTING_METHOD_FACET,
  // ...OPERATOR_LEADERSBOARD_FACET,
};

/**
 * @function
 * @name getOverviewReport
 * @description Generate overview report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 *  getOverviewReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOverviewReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria).exec();

  return baseAggregation.facet(OVERVIEW_FACET).exec(onResults);
};

const getOverviewReportParallel = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  const getOverallSummary = callback =>
    baseAggregation.facet(OVERALL_FACET).exec(callback);

  const getJurisdictionSummary = callback =>
    baseAggregation.facet(JURISDICTION_FACET).exec(callback);

  const getStatusSummary = callback =>
    baseAggregation.facet(STATUS_FACET).exec(callback);

  const getPrioritySummary = callback =>
    baseAggregation.facet(PRIORITY_FACET).exec(callback);

  // const getServiceSummary = callback =>
  //   baseAggregation.facet(SERVICE_FACET).exec(callback);

  // const getServiceGroupSummary = callback =>
  //   baseAggregation.facet(SERVICE_GROUP_FACET).exec(callback);

  // const getServiceTypeSummary = callback =>
  //   baseAggregation.facet(SERVICE_TYPE_FACET).exec(callback);

  // const getWorkspaceSummary = callback =>
  //   baseAggregation.facet(WORKSPACE_FACET).exec(callback);

  // const getReportingMethodSummary = callback =>
  //   baseAggregation.facet(REPORTING_METHOD_FACET).exec(callback);

  // const getOperatorsSummary = callback =>
  //   baseAggregation.facet(OPERATOR_LEADERSBOARD_FACET).exec(callback);

  return parallel(
    [
      getOverallSummary,
      getJurisdictionSummary,
      getStatusSummary,
      getPrioritySummary,
    ],
    onResults
  );
};

/**
 * This is performance report based on service request
 * It consist of
 *  - Total service requests per a given period
 *  - Pending service requests
 *  - Resolved service requests
 *  - Service requests breakdown based on their status
 *  - Service requests breakdown based on their priority
 *  - Service requests breakdown based on their nature/service
 *  - Service requests breakdown based on their service group
 *  - Service requests breakdown based on their workspace
 *  - Service requests breakdown based on their type
 *  - Service requests breakdown based on their reporting method
 *
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.1.0
 */

const PERFORMANCE_FACET = {
  ...OVERALL_FACET,
  ...STATUS_FACET,
  ...PRIORITY_FACET,
  ...SERVICE_FACET,
  ...SERVICE_GROUP_FACET,
  ...SERVICE_TYPE_FACET,
};

/**
 * @function
 * @name getPerformanceReport
 * @description Generate performance report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 *  getPerformanceReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getPerformanceReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  return baseAggregation.facet(PERFORMANCE_FACET).exec(onResults);
};

/**
 * This is performance report based on service request
 * It consist of
 *  - Total service requests per a given period
 *  - Pending service requests
 *  - Resolved service requests
 *  - Service requests breakdown based on their status
 *  - Service requests breakdown based on their nature/service
 *
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.1.0
 */

const OPERATOR_PERFORMANCE_FACET = {
  ...OVERALL_FACET,
  ...SERVICE_FACET,
};

/**
 * @function
 * @name getOperatorPerformanceReport
 * @description Generate operator performance report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 *  getOperatorPerformanceReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOperatorPerformanceReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  return baseAggregation.facet(OPERATOR_PERFORMANCE_FACET).exec(onResults);
};

/**
 * @function
 * @name normalizeTime
 * @description Normalize average times which are in milliseconds to a human
 * readable object
 *
 * @param {number} time Time in milliseconds
 * @returns {object} time object that have days,hours,minutes, seconds and e.t.c
 *
 * @version 0.1.0
 * @since 0.2.0
 */
const normalizeTime = time => {
  if (!isNumber(time)) {
    return parseMs(0);
  }

  const averageTime = time >= 0 ? time : -time;

  return parseMs(averageTime);
};

/**
 * @function
 * @name normalizeObjectTimes
 * @description Normalize times in a provided object (item)
 *
 * @param {object} item Object with times to be normalized
 * @returns {object} Object with averageResolve time and averageAttend Time parse
 *
 * @version 0.1.0
 * @since 0.2.0
 */
const normalizeObjectTimes = item => {
  const normalizeObject = {};

  normalizeObject.averageResolveTime = normalizeTime(item.averageResolveTime);

  normalizeObject.averageAttendTime = normalizeTime(item.averageAttendTime);

  return { ...item, ...normalizeObject };
};

/**
 * @function
 * @name prepareReportResponse
 * @description Prepare response for Reports by normalizing response shape and average times
 *
 * @param {object} results Aggregation results
 * @returns {object} Normalized response object
 *
 * @version 0.1.0
 * @since 0.2.0
 */
const prepareReportResponse = results => {
  const defaultResults = {
    data: {},
  };

  const data = head(results);

  data.overall = head(data.overall);

  if (data.overall) {
    data.overall = normalizeObjectTimes(data.overall);
  }

  if (data.jurisdictions) {
    data.jurisdictions = map(data.jurisdictions, normalizeObjectTimes);
  }

  if (data.priorities) {
    data.priorities = map(data.priorities, normalizeObjectTimes);
  }

  if (data.services) {
    data.services = map(data.services, normalizeObjectTimes);
  }

  if (data.groups) {
    data.groups = map(data.groups, normalizeObjectTimes);
  }

  if (data.types) {
    data.types = map(data.types, normalizeObjectTimes);
  }

  if (data.methods) {
    data.methods = map(data.methods, normalizeObjectTimes);
  }

  return { ...defaultResults, data };
};

/* eslint-disable jsdoc/check-tag-names */

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_OVERVIEW = '/reports/overviews';
const PATH_PERFORMANCE = '/reports/performances';
const PATH_OPERATOR_PERFORMANCE = '/reports/operators';

const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /reports/overviews Overview Report
 * @apiGroup Analytics
 * @apiName GetOverviews
 * @apiVersion 1.0.0
 * @apiDescription Return overview report
 * @apiUse RequestHeaders
 * @apiUse Overview
 *
 * @apiUse RequestHeaderExample
 * @apiUse OverviewSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_OVERVIEW, (request, response, next) => {
  const options = merge({}, request.mquery);

  const filter = options.filter || {};

  getOverviewReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      const data = prepareReportResponse(results);
      response.status(200);
      response.json(data);
    }
  });
});

router.get('/reports/testoverviews', (request, response, next) => {
  const options = merge({}, request.mquery);

  const filter = options.filter || {};

  getOverviewReportParallel(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {get} /reports/performances Area/Jurisdiction performance report
 * @apiGroup Analytics
 * @apiName GetPerformances
 * @apiVersion 1.0.0
 * @apiDescription Return area/jurisdiction performance report
 * @apiUse RequestHeaders
 * @apiUse Performance
 *
 * @apiUse RequestHeaderExample
 * @apiUse OverviewSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_PERFORMANCE, (request, response, next) => {
  const options = merge({}, request.mquery);

  const filter = options.filter || {};

  getPerformanceReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      const data = prepareReportResponse(results);
      response.status(200);
      response.json(data);
    }
  });
});

// TODO update api doc here

/**
 * @api {get} /reports/operators Overview Report
 * @apiGroup Analytics
 * @apiName GetOperators
 * @apiVersion 1.0.0
 * @apiDescription Return overview report
 * @apiUse RequestHeaders
 * @apiUse Operator
 *
 * @apiUse RequestHeaderExample
 * @apiUse OverviewSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_OPERATOR_PERFORMANCE, (request, response, next) => {
  const options = merge({}, request.mquery);

  const filter = options.filter || {};

  getOperatorPerformanceReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      const data = prepareReportResponse(results);
      response.status(200);
      response.json(data);
    }
  });
});

/**
 * @name majifix-analytics
 * @description A module for analytics and visualizations of majifix data
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { app } = require('@codetanzania/majifix-analytics');
 *
 * ...
 *
 * app.start();
 */

const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

// extract api version
const apiVersion = router.version;

export { apiVersion, info, router };
