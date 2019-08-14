/**
 * @description A representation an entity which provides a way
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
