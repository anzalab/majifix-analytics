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
import getServiceRequestBaseAggregation, {
  METRIC_TIMES,
} from '../base/servicerequest.base';
import { getFacet } from '../util';
import {
  OVERALL_FACET,
  JURISDICTION_FACET,
  STATUS_FACET,
  PRIORITY_FACET,
  SERVICE_FACET,
  SERVICE_GROUP_FACET,
  SERVICE_TYPE_FACET,
  WORKSPACE_FACET,
  REPORTING_CHANNEL_FACET,
  OPERATOR_LEADERSBOARD_FACET,
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
  ...REPORTING_CHANNEL_FACET,
  ...OPERATOR_LEADERSBOARD_FACET,
};

/**
 * @function
 * @name getOverviewReport
 * @description Generate overview report based on provided criteria
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
 *  getOverviewReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOverviewReport = (criteria, facetKeys, onResults) => {
  const baseAggregation = getServiceRequestBaseAggregation(
    criteria,
    METRIC_TIMES
  );

  const FACET = getFacet(OVERVIEW_FACET, facetKeys);

  return baseAggregation.facet(FACET).exec(onResults);
};

export default getOverviewReport;
