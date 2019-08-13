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

/* dependencies */
import _ from 'lodash';
import { getString } from '@lykmapipo/env';
import { Router } from '@lykmapipo/express-common';
import getOverviewReport from './reports/overview';

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_OVERVIEW = '/reports/overview';
// const PATH_PERFORMANCE = '/reports/performance';

const router = new Router({
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

// router.get(PATH_PERFORMANCE, function getPerformance(
//   request,
//   response,
//   next
// ) {});

export default router;
