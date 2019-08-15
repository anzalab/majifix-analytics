/**
 * @apiDefine Analytics Analytics
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

/**
 * @apiDefine Overview
 * @apiSuccess {object} overall Overall report the organization
 * @apiSuccess {Number} overall.pending Count of all pending service requests
 * @apiSuccess {Number} overall.unattended Count of all unattended service requests
 * @apiSuccess {Number} overall.count Count of all service requests
 * @apiSuccess {Number} overall.averageResolveTime Average time to resolve a service requests in milliseconds
 * @apiSuccess {Number} overall.averageAttendTime  Average time to attend a service request in milliseconds
 * @apiSuccess {Object[]} jurisdictions  List of areas/jurisdictions in the organization
 * @apiSuccess {String} jurisdiction._id  Unique identification for jurisdiction/area
 * @apiSuccess {Number} jurisdiction.pending Count of all pending jurisdiction service requests
 * @apiSuccess {Number} jurisdiction.resolved Count of all resolved jurisdiction service requests
 * @apiSuccess {Number} jurisdiction.late Count of all late jurisdiction service requests
 * @apiSuccess {Number} jurisdiction.unattended Count of all unattended jurisdiction service requests
 * @apiSuccess {Number} jurisdiction.count Count of all jurisdiction service requests
 * @apiSuccess {Number} jurisdiction.averageResolveTime Jurisdiction average resolve time in milliseconds
 * @apiSuccess {Number} jurisdiction.averageAttendTime Jurisdiction average attend time in milliseconds
 * @apiSuccess {String} jurisdiction.name Jurisdiction name
 * @apiSuccess {String} jurisdiction.email Jurisdiction email address
 * @apiSuccess {String} jurisdiction.color Jurisdiction color
 * @apiSuccess {String} jurisdiction.phone Jurisdiction phone number
 * @apiSuccess {Object[]} status List of status in Jurisdiction
 * @apiSuccess {String} status._id Status unique identification
 * @apiSuccess {object} status.name Status multilingual name
 * @apiSuccess {String} status.color Status color
 * @apiSuccess {Number} status.weight Status weight
 * @apiSuccess {Number} status.count Number of service requests with this status
 * @apiSuccess {Number} status.pending Number of pending service requests with this status
 * @apiSuccess {Number} status.resolved Number of resolved service requests with this status
 * @apiSuccess {Object[]} priorities  List of priorities in the organization
 * @apiSuccess {String} priority._id  Unique identification for priority
 * @apiSuccess {Number} priority.pending Count of all pending priority service requests
 * @apiSuccess {Number} priority.resolved Count of all resolved priority service requests
 * @apiSuccess {Number} priority.late Count of all late priority service requests
 * @apiSuccess {Number} priority.unattended Count of all unattended priority service requests
 * @apiSuccess {Number} priority.count Count of all priority service requests
 * @apiSuccess {Number} priority.averageResolveTime Priority average resolve time in milliseconds
 * @apiSuccess {Number} priority.averageAttendTime Priority average attend time in milliseconds
 * @apiSuccess {String} priority.name Priority multilingual name
 * @apiSuccess {String} priority.color Priority color
 * @apiSuccess {Object[]} services List of services in the organization
 * @apiSuccess {String} service._id  Unique identification for service
 * @apiSuccess {Number} service.pending Count of all pending service service requests
 * @apiSuccess {Number} service.resolved Count of all resolved service service requests
 * @apiSuccess {Number} service.late Count of all late service service requests
 * @apiSuccess {Number} service.unattended Count of all unattended service service requests
 * @apiSuccess {Number} service.count Count of all service service requests
 * @apiSuccess {Number} service.averageResolveTime service average resolve time in milliseconds
 * @apiSuccess {Number} service.averageAttendTime service average attend time in milliseconds
 * @apiSuccess {String} service.name Service multilingual name
 * @apiSuccess {String} service.color Service color
 * @apiSuccess {Object[]} groups List of service groups in the organization
 * @apiSuccess {String} group._id  Unique identification for service group
 * @apiSuccess {Number} group.pending Count of all pending service requests in service group
 * @apiSuccess {Number} group.resolved Count of all resolved service requests in service group
 * @apiSuccess {Number} group.late Count of all late service requests in service group
 * @apiSuccess {Number} group.unattended Count of all unattended service requests in service group
 * @apiSuccess {Number} group.count Count of all service requests in service group
 * @apiSuccess {Number} group.averageResolveTime Service group average resolve time in milliseconds
 * @apiSuccess {Number} group.averageAttendTime Service group average attend time in milliseconds
 * @apiSuccess {String} group.name Service group multilingual name
 * @apiSuccess {String} group.color Service group color
 * @apiSuccess {Object[]} types List of services in the organization
 * @apiSuccess {String} type._id  Unique identification for service
 * @apiSuccess {Number} type.pending Count of all pending service requests with service type
 * @apiSuccess {Number} type.resolved Count of all resolved service requests with service type
 * @apiSuccess {Number} type.late Count of all late service requests with service type
 * @apiSuccess {Number} type.unattended Count of all unattended service requests with service type
 * @apiSuccess {Number} type.count Count of all service requests with service type
 * @apiSuccess {Number} type.averageResolveTime Service Type average resolve time in milliseconds
 * @apiSuccess {Number} type.averageAttendTime Service Type average attend time in milliseconds
 * @apiSuccess {String} type.name Service Type multilingual name
 * @apiSuccess {String} type.color Service Type color
 * @apiSuccess {String} type.code Service Type code
 * @apiSuccess {Object} type.abbreviation Service Type multilingual abbreviation
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object[]} workspaces List of workspaces in the organization
 * @apiSuccess {String} workspace._id  Unique identification for workspace
 * @apiSuccess {Number} workspace.count Count of all pending service requests in workspace
 * @apiSuccess {Number} workspace.pending Count of all pending service requests in workspace
 * @apiSuccess {Number} workspace.resolved Count of all pending service requests in workspace
 * @apiSuccess {String} workspace.name Count of all resolved service requests in workspace
 * @apiSuccess {Object[]} methods List of reporting methods for service requests in the organization
 * @apiSuccess {String} workspace._id  Unique identification for reporting method
 * @apiSuccess {Number} workspace.count Count of all pending service requests in reporting method
 * @apiSuccess {Number} workspace.pending Count of all pending service requests in reporting method
 * @apiSuccess {Number} workspace.resolved Count of all pending service requests in reporting method
 * @apiSuccess {String} workspace.name Count of all resolved service requests in reporting method
 * @apiSuccess {Object[]} leadersboard List of operators based on reported service requests in the organization
 * @apiSuccess {String} operator._id  Unique identification for operator
 * @apiSuccess {Number} operator.pending Count of all pending operator service requests
 * @apiSuccess {Number} operator.resolved Count of all resolved operator service requests
 * @apiSuccess {Number} operator.late Count of all late operator service requests
 * @apiSuccess {Number} operator.count Count of all operator service requests
 * @apiSuccess {Number} operator.averageResolveTime Jurisdiction average resolve time in milliseconds
 * @apiSuccess {Number} operator.averageAttendTime Jurisdiction average attend time in milliseconds
 * @apiSuccess {String} operator.name Operator name
 * @apiSuccess {String} operator.email Operator email address
 * @apiSuccess {String} operator.phone Operator phone number
 */

/**
 * @apiDefine Performance
 * @apiSuccess {object} overall Overall report the organization
 * @apiSuccess {Number} overall.pending Count of all pending service requests
 * @apiSuccess {Number} overall.unattended Count of all unattended service requests
 * @apiSuccess {Number} overall.count Count of all service requests
 * @apiSuccess {Number} overall.averageResolveTime Average time to resolve a service requests in milliseconds
 * @apiSuccess {Number} overall.averageAttendTime  Average time to attend a service request in milliseconds
 * @apiSuccess {Object[]} status List of status in Jurisdiction
 * @apiSuccess {String} status._id Status unique identification
 * @apiSuccess {object} status.name Status multilingual name
 * @apiSuccess {String} status.color Status color
 * @apiSuccess {Number} status.weight Status weight
 * @apiSuccess {Number} status.count Number of service requests with this status
 * @apiSuccess {Number} status.pending Number of pending service requests with this status
 * @apiSuccess {Number} status.resolved Number of resolved service requests with this status
 * @apiSuccess {Object[]} priorities  List of priorities in the organization
 * @apiSuccess {String} priority._id  Unique identification for priority
 * @apiSuccess {Number} priority.pending Count of all pending priority service requests
 * @apiSuccess {Number} priority.resolved Count of all resolved priority service requests
 * @apiSuccess {Number} priority.late Count of all late priority service requests
 * @apiSuccess {Number} priority.unattended Count of all unattended priority service requests
 * @apiSuccess {Number} priority.count Count of all priority service requests
 * @apiSuccess {Number} priority.averageResolveTime Priority average resolve time in milliseconds
 * @apiSuccess {Number} priority.averageAttendTime Priority average attend time in milliseconds
 * @apiSuccess {String} priority.name Priority multilingual name
 * @apiSuccess {String} priority.color Priority color
 * @apiSuccess {Object[]} services List of services in the organization
 * @apiSuccess {String} service._id  Unique identification for service
 * @apiSuccess {Number} service.pending Count of all pending service service requests
 * @apiSuccess {Number} service.resolved Count of all resolved service service requests
 * @apiSuccess {Number} service.late Count of all late service service requests
 * @apiSuccess {Number} service.unattended Count of all unattended service service requests
 * @apiSuccess {Number} service.count Count of all service service requests
 * @apiSuccess {Number} service.averageResolveTime service average resolve time in milliseconds
 * @apiSuccess {Number} service.averageAttendTime service average attend time in milliseconds
 * @apiSuccess {String} service.name Service multilingual name
 * @apiSuccess {String} service.color Service color
 * @apiSuccess {Object[]} groups List of service groups in the organization
 * @apiSuccess {String} group._id  Unique identification for service group
 * @apiSuccess {Number} group.pending Count of all pending service requests in service group
 * @apiSuccess {Number} group.resolved Count of all resolved service requests in service group
 * @apiSuccess {Number} group.late Count of all late service requests in service group
 * @apiSuccess {Number} group.unattended Count of all unattended service requests in service group
 * @apiSuccess {Number} group.count Count of all service requests in service group
 * @apiSuccess {Number} group.averageResolveTime Service group average resolve time in milliseconds
 * @apiSuccess {Number} group.averageAttendTime Service group average attend time in milliseconds
 * @apiSuccess {String} group.name Service group multilingual name
 * @apiSuccess {String} group.color Service group color
 * @apiSuccess {Object[]} types List of services in the organization
 * @apiSuccess {String} type._id  Unique identification for service
 * @apiSuccess {Number} type.pending Count of all pending service requests with service type
 * @apiSuccess {Number} type.resolved Count of all resolved service requests with service type
 * @apiSuccess {Number} type.late Count of all late service requests with service type
 * @apiSuccess {Number} type.unattended Count of all unattended service requests with service type
 * @apiSuccess {Number} type.count Count of all service requests with service type
 * @apiSuccess {Number} type.averageResolveTime Service Type average resolve time in milliseconds
 * @apiSuccess {Number} type.averageAttendTime Service Type average attend time in milliseconds
 * @apiSuccess {String} type.name Service Type multilingual name
 * @apiSuccess {String} type.color Service Type color
 * @apiSuccess {String} type.code Service Type code
 * @apiSuccess {Object} type.abbreviation Service Type multilingual abbreviation
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object} type.description Service Type multilingual description
 * @apiSuccess {Object[]} workspaces List of workspaces in the organization
 * @apiSuccess {String} workspace._id  Unique identification for workspace
 * @apiSuccess {Number} workspace.count Count of all pending service requests in workspace
 * @apiSuccess {Number} workspace.pending Count of all pending service requests in workspace
 * @apiSuccess {Number} workspace.resolved Count of all pending service requests in workspace
 * @apiSuccess {String} workspace.name Count of all resolved service requests in workspace
 * @apiSuccess {Object[]} methods List of reporting methods for service requests in the organization
 * @apiSuccess {String} workspace._id  Unique identification for reporting method
 * @apiSuccess {Number} workspace.count Count of all pending service requests in reporting method
 * @apiSuccess {Number} workspace.pending Count of all pending service requests in reporting method
 * @apiSuccess {Number} workspace.resolved Count of all pending service requests in reporting method
 * @apiSuccess {String} workspace.name Count of all resolved service requests in reporting method
 * @apiSuccess {Object[]} leadersboard List of operators based on reported service requests in the organization
 * @apiSuccess {String} operator._id  Unique identification for operator
 * @apiSuccess {Number} operator.pending Count of all pending operator service requests
 * @apiSuccess {Number} operator.resolved Count of all resolved operator service requests
 * @apiSuccess {Number} operator.late Count of all late operator service requests
 * @apiSuccess {Number} operator.count Count of all operator service requests
 * @apiSuccess {Number} operator.averageResolveTime Jurisdiction average resolve time in milliseconds
 * @apiSuccess {Number} operator.averageAttendTime Jurisdiction average attend time in milliseconds
 * @apiSuccess {String} operator.name Operator name
 * @apiSuccess {String} operator.email Operator email address
 * @apiSuccess {String} operator.phone Operator phone number
 */

/**
 * @apiDefine OverviewSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "overall": [
 *          {
 *              "pending": 1236,
 *              "resolved": 7523,
 *              "unattended": 62,
 *              "count": 8759,
 *              "averageResolveTime": 65559983.95719793,
 *              "averageAttendTime": 95342508.40483037
 *          }
 *      ],
 *      "jurisdictions": [
 *          {
 *              "_id": "5968b64148dfc224bb47748a",
 *              "pending": 33,
 *              "resolved": 423,
 *              "late": 0,
 *              "unattended": 0,
 *              "name": "Moscow",
 *              "email": "moscow.controlroom@example.com",
 *              "phone": "2557XXXXXX",
 *              "color": "#EA549A",
 *              "count": 456,
 *              "averageResolveTime": 38057080.037825055,
 *              "averageAttendTime": 97591.88596491228
 *          },
 *      ],
 *      "status": [
 *          {
 *              "_id": "5968b633617399248a4307b9",
 *              "name": {
 *                  "en": "Open",
 *                  "sw": "Open"
 *              },
 *              "color": "#0D47A1",
 *              "weight": -5,
 *              "count": 103,
 *              "pending": 99,
 *              "resolved": 4
 *          },
 *          {
 *              "_id": "597728637d475468b97f28cc",
 *              "name": {
 *                  "en": "Escallated",
 *                  "sw": "Escallated"
 *              },
 *              "color": "#EF6C00",
 *              "weight": 0,
 *              "count": 329,
 *              "pending": 328,
 *              "resolved": 1
 *          },
 *      ],
 *      "priorities": [
 *          {
 *              "_id": "5968b64148dfc224bb47747f",
 *              "name": {
 *                  "en": "Commercial",
 *                  "sw": "Commercial"
 *              },
 *              "color": "#06C947",
 *              "weight": null,
 *              "count": 6335,
 *              "pending": 364,
 *              "resolved": 5971,
 *              "unattended": 21,
 *              "averageResolveTime": 24145279.545469772,
 *              "averageAttendTime": -900215.5209059233
 *          },
 *      ],
 *      "services": [
 *          {
 *              "_id": "5968b64248dfc224bb47749a",
 *              "pending": 23,
 *              "resolved": 4,
 *              "late": 0,
 *              "unattended": 0,
 *              "name": {
 *                  "en": "Adjustment BTN",
 *                  "sw": "Adjustment BTN"
 *              },
 *              "color": "#006064",
 *              "count": 27,
 *              "averageResolveTime": 501567343.5,
 *              "averageAttendTime": 342148.6666666667
 *          },
 *          {
 *              "_id": "5968b64248dfc224bb477496",
 *              "pending": 93,
 *              "resolved": 4296,
 *              "late": 0,
 *              "unattended": 0,
 *              "name": {
 *                  "en": "Billing",
 *                  "sw": "Billing"
 *              },
 *              "color": "#0D47A1",
 *              "count": 4389,
 *              "averageResolveTime": 7644283.580074488,
 *              "averageAttendTime": 349102.0405559353
 *          },
 *      ],
 *      "groups": [
 *          {
 *              "_id": "5968b64148dfc224bb47747f",
 *              "pending": 364,
 *              "resolved": 5971,
 *              "late": 0,
 *              "unattended": 21,
 *              "name": "Commercial",
 *              "color": "#06C947",
 *              "count": 6335,
 *              "averageResolveTime": 24145279.545469772,
 *              "averageAttendTime": -900215.5209059233
 *          },
 *          {
 *              "_id": "5975c8b57f121c4b1bbb59b6",
 *              "pending": 5,
 *              "resolved": 2,
 *              "late": 0,
 *              "unattended": 1,
 *              "name": "Illegal",
 *              "color": "#263238",
 *              "count": 7,
 *              "averageResolveTime": 396837241,
 *              "averageAttendTime": -31132389.333333332
 *          },
 *      ],
 *      "types": [
 *          {
 *              "_id": "5d48552251bb3448af54facf",
 *              "name": {
 *                  "en": "Request",
 *                  "sw": "Request"
 *              },
 *              "color": "#884bea",
 *              "code": "R",
 *              "description": {
 *                  "en": "Request",
 *                  "sw": "Request"
 *              },
 *      ],
 *      "workspaces": [
 *          {
 *              "_id": "Call Center",
 *              "count": 7073,
 *              "name": "Call Center"
 *          },
 *          {
 *              "_id": "Customer Care",
 *              "count": 1513,
 *              "name": "Customer Care"
 *          },
 *      ],
 *      "methods": [
 *          {
 *              "_id": "Call",
 *              "count": 7441,
 *              "name": "Call"
 *          },
 *          {
 *              "_id": "Mobile",
 *              "count": 90,
 *              "name": "Mobile"
 *          },
 *      ],
 *      "leadersboard": [
 *          {
 *              "_id": "5c653d170e22b7594cb3c41b",
 *              "pending": 79,
 *              "resolved": 441,
 *              "count": 520,
 *              "name": "John Doe",
 *              "email": "john.doe@example.com",
 *              "phone": "0753744714"
 *          },
 *
 *      ]
 *  }
 */

/* dependencies */
import _ from 'lodash';
import { Router } from '@lykmapipo/express-common';
import { getString } from '@lykmapipo/env';
import getOverviewReport from './reports/overview';
import getPerformanceReport from './reports/performance';
import getOperatorPerformanceReport from './reports/operator';

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_OVERVIEW = '/reports/overview';
const PATH_PERFORMANCE = '/reports/performance/:id';
const PATH_OPERATOR_PERFORMANCE = '/reports/operator/:id';

const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /reports/overview Overview Report
 * @apiGroup Analytics
 * @apiName GetOverviewReport
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
  const options = _.merge({}, request.mquery);

  const filter = options.filter || {};

  getOverviewReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {get} /reports/performance/:id Area/Jurisdiction performance report
 * @apiGroup Analytics
 * @apiName GetPerformanceReport
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
  const options = _.merge({}, request.mquery);

  let filter = options.filter || {};

  if (request.params.id) {
    filter = _.merge({}, filter, { jurisdiction: request.params.id });
  }

  getPerformanceReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200);
      response.json(results);
    }
  });
});

// TODO update api doc here

/**
 * @api {get} /reports/overview Overview Report
 * @apiGroup Analytics
 * @apiName GetOverviewReport
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
  const options = _.merge({}, request.mquery);

  let filter = options.filter || {};

  if (request.params.id) {
    filter = _.merge({}, filter, { operator: request.params.id });
  }

  getOperatorPerformanceReport(filter, (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200);
      response.json(results);
    }
  });
});

export default router;
