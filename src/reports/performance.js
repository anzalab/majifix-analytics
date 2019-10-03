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

/* dependencies */
import getBaseAggregation, { METRIC_TIMES } from '../base/servicerequest.base';
import { getFacet } from '../util';
import {
  OVERALL_FACET,
  STATUS_FACET,
  PRIORITY_FACET,
  SERVICE_FACET,
  SERVICE_GROUP_FACET,
  SERVICE_TYPE_FACET,
} from '../base/facets';

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
 * @param {string[]} facetKeys Contain list of facets key to be used to generate report
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.2.0
 * @since 0.1.0
 *
 * @example
 *  getPerformanceReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getPerformanceReport = (criteria, facetKeys, onResults) => {
  const baseAggregation = getBaseAggregation(criteria, METRIC_TIMES);

  const FACET = getFacet(PERFORMANCE_FACET, facetKeys);

  return baseAggregation.facet(FACET).exec(onResults);
};

export default getPerformanceReport;
