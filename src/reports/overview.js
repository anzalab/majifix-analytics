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

/* dependencies */
import getBaseAggregation from '../base/servicerequest.base';
import {
  OVERALL_FACET,
  JURISDICTION_FACET,
  STATUS_FACET,
  PRIORITY_FACET,
  SERVICE_FACET,
  SERVICE_GROUP_FACET,
  SERVICE_TYPE_FACET,
  WORKSPACE_FACET,
  REPORTING_METHOD_FACET,
  LEADERSBOARD_FACET,
} from '../base/facets';

const OVERVIEW_FACET = {
  ...OVERALL_FACET,
  ...JURISDICTION_FACET,
  ...STATUS_FACET,
  ...PRIORITY_FACET,
  ...SERVICE_FACET,
  ...SERVICE_GROUP_FACET,
  ...SERVICE_TYPE_FACET,
  ...WORKSPACE_FACET,
  ...REPORTING_METHOD_FACET,
  ...LEADERSBOARD_FACET,
};

/**
 * @function
 * @name getOverviewReport
 * @description Generate overview report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 *  getOverviewReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOverviewReport = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  return baseAggregation.facet(OVERVIEW_FACET).exec(onResults);
};

export default getOverviewReport;
