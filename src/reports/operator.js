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
import getServiceRequestBaseAggregation, {
  METRIC_TIMES,
} from '../base/servicerequest.base';
import { getFacet } from '../util';
import { OVERALL_FACET, SERVICE_FACET } from '../base/facets';

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
 * @param {string[]} facetKeys Contain list of facets key to be used to generate report
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.2.0
 * @since 0.1.0
 *
 * @example
 *  getOperatorPerformanceReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOperatorPerformanceReport = (criteria, facetKeys, onResults) => {
  const baseAggregation = getServiceRequestBaseAggregation(
    criteria,
    METRIC_TIMES
  );

  const FACET = getFacet(OPERATOR_PERFORMANCE_FACET, facetKeys);

  return baseAggregation.facet(FACET).exec(onResults);
};

export default getOperatorPerformanceReport;
