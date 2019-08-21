/**
 * @namespace OVERALL_FACET
 * @description Facet for service requests overall general breakdown
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const OVERALL_FACET = {
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
export const JURISDICTION_FACET = {
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
export const SERVICE_FACET = {
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
export const SERVICE_GROUP_FACET = {
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
 * @namespace REPORTING_METHOD_FACET
 * @description Facet for service requests breakdown based on their reporting
 * methods
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const REPORTING_METHOD_FACET = {
  methods: [
    {
      $group: {
        _id: '$method.name',
        count: { $sum: 1 },
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        averageResolveTime: { $avg: '$ttr.milliseconds' },
        averageAttendTime: { $avg: '$call.duration.milliseconds' },
      },
    },
    {
      $project: {
        name: '$_id',
        count: 1,
        pending: 1,
        resolved: 1,
        averageResolveTime: 1,
        averageAttendTime: 1,
      },
    },
    { $sort: { count: -1 } },
  ],
};

/**
 * @namespace SERVICE_STATUS_BREAKDOWN_FACET
 * @description Facet for breakingdown service requests per their services and
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
  leadersboard: [
    {
      $group: {
        _id: '$operator._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        count: { $sum: 1 },
        name: { $first: '$operator.name' },
        email: { $first: '$operator.email' },
        phone: { $first: '$operator.phone' },
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
 * @description Facet foe assignees leader's board
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const ASSIGNEE_LEADERSBOARD_FACET = {
  assignees: [
    {
      $group: {
        _id: '$$assignee._id',
        pending: { $sum: '$pending' },
        resolved: { $sum: '$resolved' },
        count: { $sum: 1 },
        name: { $first: '$operator.name' },
        email: { $first: '$operator.email' },
        phone: { $first: '$operator.phone' },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ],
};
