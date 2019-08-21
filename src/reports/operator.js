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

/* dependencies */
import getBaseAggregation from '../base/servicerequest.base';
import {
  OVERALL_FACET,
  STATUS_FACET,
  SERVICE_STATUS_BREAKDOWN_FACET,
} from '../base/facets';

const OPERATOR_PERFORMANCE_FACET = {
  ...OVERALL_FACET,
  ...STATUS_FACET,
  ...SERVICE_STATUS_BREAKDOWN_FACET,
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

export default getOperatorPerformanceReport;
