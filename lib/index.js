'use strict';

const common = require('@lykmapipo/common');
const _ = require('lodash');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');
const mongooseCommon = require('@lykmapipo/mongoose-common');

/**
 * Base aggregation for service requests
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 *
 * @version 0.1.0
 * @since 0.1.0
 */

/* declarations */

const getBaseAggregation = () => {
  const ServiceRequest = mongooseCommon.model('ServiceRequest');

  return ServiceRequest.lookup();
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

/* facets */

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
        count: { sum: 1 },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
  ],
};

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

const STATUS_FACET = {
  status: [
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

const SERVICE_FACET = {
  services: [
    {
      $group: {
        _id: '$service._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unattended: { $sum: '$unattended' },
        name: { $first: '$service.name.en' },
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
      },
    },
  ],
};

const WORKSPACE_FACET = {
  workspaces: [
    { $sortByCount: '$method.workspace' },
    {
      $project: {
        name: '$_id',
        count: 1,
      },
    },
  ],
};

const REPORTING_METHOD_FACET = {
  methods: [
    { $sortByCount: '$method.name' },
    {
      $project: {
        name: '$_id',
        count: 1,
      },
    },
  ],
};

const FACET = {
  ...OVERALL_FACET,
  ...JURISDICTION_FACET,
  ...STATUS_FACET,
  ...PRIORITY_FACET,
  ...SERVICE_FACET,
  ...SERVICE_GROUP_FACET,
  ...SERVICE_TYPE_FACET,
  ...WORKSPACE_FACET,
  ...REPORTING_METHOD_FACET,
};

const getOverviewReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation();

  return baseAggregation
    .match(criteria)
    .addFields({
      pending: {
        $cond: { if: { $eq: ['$resolvedAt', null] }, then: 1, else: 0 },
      },
      unattended: {
        $cond: { if: { $eq: ['$operator', null] }, then: 1, else: 0 },
      },
      resolved: {
        $cond: { if: { $eq: ['$resolvedAt', null] }, then: 0, else: 1 },
      },
    })
    .facet(FACET)
    .exec(onResults);
};

/**
 * @apiDefine Priority Priority
 *
 * @apiDescription A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/* local constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
const PATH_OVERVIEW = '/reports/overview';
// const PATH_PERFORMANCE = '/reports/performance';

const router = new expressCommon.Router({
  version: API_VERSION,
});

router.get(PATH_OVERVIEW, function getOverview(request, response, next) {
  const options = _.merge({}, request.mquery.options);

  getOverviewReport(options, (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @name majifix-analytics
 * @version 0.1.0
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

const info = common.pkg(
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

exports.apiVersion = apiVersion;
exports.info = info;
exports.router = router;