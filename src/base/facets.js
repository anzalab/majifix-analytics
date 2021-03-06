import { getTimeFacet } from '../util';

/* constants */
const ASSIGN_TIME = getTimeFacet('assignTime');
const ATTEND_TIME = getTimeFacet('attendTime');
const COMPLETE_TIME = getTimeFacet('completeTime');
const VERIFY_TIME = getTimeFacet('verifyTime');
const APPROVE_TIME = getTimeFacet('approveTime');
const RESOLVE_TIME = getTimeFacet('resolveTime');
const LATE_TIME = getTimeFacet('lateTime');
const CONFIRM_TIME = getTimeFacet('confirmTime');
const WORK_TIME = getTimeFacet('workTime');
const CALL_TIME = {
  maximumCallTime: { $max: '$call.duration.milliseconds' },
  minimumCallTime: { $min: '$call.duration.milliseconds' },
  averageCallTime: { $avg: '$call.duration.milliseconds' },
};

const METRIC_TIMES = {
  ...ASSIGN_TIME,
  ...ATTEND_TIME,
  ...COMPLETE_TIME,
  ...VERIFY_TIME,
  ...APPROVE_TIME,
  ...RESOLVE_TIME,
  ...LATE_TIME,
  ...CONFIRM_TIME,
  ...CALL_TIME,
  ...WORK_TIME,
};

const METRIC_COUNTS = {
  approved: { $sum: '$approved' },
  assigned: { $sum: '$assigned' },
  attended: { $sum: '$attended' },
  completed: { $sum: '$completed' },
  count: { $sum: 1 },
  late: { $sum: '$late' },
  new: { $sum: '$new' },
  pending: { $sum: '$pending' },
  resolved: { $sum: '$resolved' },
  reopened: { $sum: '$reopened' },
  unconfirmed: { $sum: '$unconfirmed' },
  verified: { $sum: '$verified' },
};

/**
 * @namespace OVERALL_FACET
 * @description Facet for service requests overall general breakdown
 *
 * @version 0.2.0
 * @since 0.1.0
 */
export const OVERALL_FACET = {
  overall: [
    {
      $group: {
        _id: null,
        ...METRIC_COUNTS,
        ...METRIC_TIMES,
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
 * @version 0.2.0
 * @since 0.1.0
 */
export const JURISDICTION_FACET = {
  jurisdictions: [
    {
      $group: {
        _id: '$jurisdiction._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unconfirmed: { $sum: '$unconfirmed' },
        name: { $first: '$jurisdiction.name' },
        email: { $first: '$jurisdiction.email' },
        phone: { $first: '$jurisdiction.phone' },
        color: { $first: '$jurisdiction.color' },
        count: { $sum: 1 },
        ...METRIC_TIMES,
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
export const STATUS_FACET = {
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
    { $sort: { weight: 1 } },
  ],
};

/**
 * @namespace PRIORITY_FACET
 * @description Facet for service requests breakdown based on their priorities
 *
 * @version 0.2.0
 * @since 0.1.0
 */
export const PRIORITY_FACET = {
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
        unconfirmed: { $sum: '$unconfirmed' },
        ...METRIC_TIMES,
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
 * @version 0.2.0
 * @since 0.1.0
 */
export const SERVICE_FACET = {
  services: [
    {
      $group: {
        _id: '$service._id',
        name: { $first: '$service.name' },
        color: { $first: '$service.color' },
        ...METRIC_COUNTS,
        ...METRIC_TIMES,
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
 * @version 0.2.0
 * @since 0.1.0
 */
export const SERVICE_GROUP_FACET = {
  groups: [
    {
      $group: {
        _id: '$group._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        late: { $sum: '$late' },
        unconfirmed: { $sum: '$unconfirmed' },
        name: { $first: '$group.name.en' },
        color: { $first: '$group.color' },
        count: { $sum: 1 },
        ...METRIC_TIMES,
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
 * @version 0.2.0
 * @since 0.1.0
 */
export const SERVICE_TYPE_FACET = {
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
        unconfirmed: { $sum: '$unconfirmed' },
        late: { $sum: '$late' },
        ...METRIC_TIMES,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};

/**
 * @namespace WORKSPACE_FACET
 * @description Facet for service requests breakdown based on workspaces they
 * belong
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const WORKSPACE_FACET = {
  workspaces: [
    {
      $group: {
        _id: '$method.workspace',
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        count: 1,
        pending: 1,
        resolved: 1,
      },
    },
    { $sort: { count: -1 } },
  ],
};

/**
 * @namespace REPORTING_CHANNEL_FACET
 * @description Facet for service requests breakdown based on their reporting
 * channels i.e call, USSD , web, mobile app, visit e.t.c
 *
 * @version 0.2.1
 * @since 0.1.0
 */
export const REPORTING_CHANNEL_FACET = {
  channels: [
    {
      $group: {
        _id: '$method.name',
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
      },
    },
    {
      $project: {
        name: '$_id',
        count: 1,
        pending: 1,
        resolved: 1,
      },
    },
    { $sort: { count: -1 } },
  ],
};

/**
 * @namespace SERVICE_STATUS_BREAKDOWN_FACET
 * @description Facet for breaking down service requests per their services and
 * statuses
 *
 * @version 0.1.0
 * @since 0.4.2
 */
export const SERVICE_STATUS_BREAKDOWN_FACET = {
  statusesPerService: [
    {
      $group: {
        _id: { service: '$service._id', status: '$status._id' },
        service: { $first: '$service' },
        status: { $first: '$status' },
        statusCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: '$_id.service',
        service: { $first: '$service' },
        statuses: {
          $push: {
            status: '$status',
            count: '$statusCount',
          },
        },
        count: { $sum: '$statusCount' },
      },
    },
  ],
};

/**
 * @namespace LEADERSBOARD_FACET
 * @description Facet for operator leader's board
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const OPERATOR_LEADERSBOARD_FACET = {
  operators: [
    {
      $group: {
        _id: '$operator._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        count: { $sum: 1 },
        name: { $first: '$operator.name' },
        email: { $first: '$operator.email' },
        phone: { $first: '$operator.phone' },
        relation: { $first: '$operator.relation' },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};

/**
 * @namespace ASSIGNEE_LEADERSBOARD_FACET
 * @description Facet for assignees leader's board
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const ASSIGNEE_LEADERSBOARD_FACET = {
  assignees: [
    { $match: { assignee: { $exists: true } } },
    {
      $group: {
        _id: '$assignee._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        count: { $sum: 1 },
        name: { $first: '$assignee.name' },
        email: { $first: '$assignee.email' },
        phone: { $first: '$assignee.phone' },
        relation: { $first: '$assignee.relation' },
        workTime: { $sum: '$workTime' },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};

/**
 * @namespace ZONE_FACET
 * @description Facet for service requests per zones
 *
 * @version 0.1.0
 * @since 0.4.3
 */
export const ZONE_FACET = {
  zones: [
    { $match: { zone: { $exists: true } } },
    {
      $group: {
        _id: '$zone._id',
        name: { $first: '$zone.name' },
        color: { $first: '$zone.color' },
        description: { $first: '$zone.description' },
        ...METRIC_COUNTS,
        ...METRIC_TIMES,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};

/**
 * @namespace ITEM_FACET
 * @description Facet for items used in servirce requests
 *
 * @version 0.1.0
 * @since 0.10.0
 */
export const ITEM_FACET = {
  items: [
    { $match: { item: { $exists: true } } },
    {
      $group: {
        _id: '$item._id',
        count: { $sum: '$quantity' },
        name: { $first: '$item.name' },
        description: { $first: '$item.description' },
        properties: { $first: '$item.properties' },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};

/**
 * @namespace TRENDING_MONTH_PER_YEAR_FACET
 * @description Facet for service requests reported per month per year
 *
 * @version 0.1.0
 * @since 0.11.0
 */
export const TRENDING_MONTH_PER_YEAR_FACET = {
  countPerMonthPerYear: [
    {
      $group: {
        _id: {
          year: '$year',
          month: '$month',
        },
        monthlyCount: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: '$_id.year',
        months: {
          $push: {
            month: '$_id.month',
            count: '$monthlyCount',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id',
        months: 1,
      },
    },
    { $sort: { year: 1 } },
  ],
};

/**
 * @namespace TRENDING_HOUR_PER_DAY
 * @description count of service request per hour per day of the week
 *
 * @version 0.1.0
 * @since  0.11.0
 */
export const TRENDING_HOUR_PER_DAY = {
  countPerHourPerDay: [
    {
      $group: {
        _id: {
          day: '$weekDay',
          hour: '$hour',
        },
        countPerHour: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: '$_id.day',
        hours: {
          $push: {
            hour: '$_id.hour',
            count: '$countPerHour',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        day: '$_id',
        hours: 1,
      },
    },
    { $sort: { day: 1 } },
  ],
};

/**
 * @namespace TRENDING_PER_YEAR
 * @description Count of service requests per year
 *
 * @version 0.1.0
 * @since 0.11.0
 */
export const TRENDING_PER_YEAR = {
  countPerYear: [
    {
      $group: {
        _id: '$year',
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id',
        count: 1,
      },
    },
    { $sort: { year: 1 } },
  ],
};
