/**
 * This is operational report based on service request
 * It consist of
 *  - Total service requests per a given period
 *  - Pending service requests
 *  - Resolved service requests
 *  - Assigned service requests
 *  - In Progress service requests
 *  - Completed service requests
 *  - Verified Service requests
 *  - Approved Service requests
 *  - Service requests breakdown based on their zones
 *  - Service requests breakdown based on their nature/service
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.4.3
 */

/* dependencies */
import getBaseAggregation from '../base/servicerequest.base';
import { OVERALL_FACET, SERVICE_FACET } from '../base/facets';

const OPERATIONAL_FACET = {
  ...OVERALL_FACET,
  ...SERVICE_FACET,
};

/**
 * @function
 * @name getOperationalReport
 * @description Generate operational report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 *  getOperationalReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOperationalReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  return baseAggregation.facet(OPERATIONAL_FACET).exec(onResults);
};

export default getOperationalReport;
