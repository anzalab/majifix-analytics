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
import parallel from 'async/parallel';
import getBaseAggregation from '../base/servicerequest.base';
import {
  OVERALL_FACET,
  JURISDICTION_FACET,
  STATUS_FACET,
  PRIORITY_FACET,
  // SERVICE_FACET,
  // SERVICE_GROUP_FACET,
  // SERVICE_TYPE_FACET,
  // WORKSPACE_FACET,
  // REPORTING_METHOD_FACET,
  // OPERATOR_LEADERSBOARD_FACET,
} from '../base/facets';

const OVERVIEW_FACET = {
  ...OVERALL_FACET,
  ...JURISDICTION_FACET,
  ...STATUS_FACET,
  ...PRIORITY_FACET,
  // ...SERVICE_FACET,
  // ...SERVICE_GROUP_FACET,
  // ...SERVICE_TYPE_FACET,
  // ...WORKSPACE_FACET,
  // ...REPORTING_METHOD_FACET,
  // ...OPERATOR_LEADERSBOARD_FACET,
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
  const baseAggregation = getBaseAggregation(criteria).exec();

  return baseAggregation.facet(OVERVIEW_FACET).exec(onResults);
};

export const getOverviewReportParallel = (criteria, onResults) => {
  const baseAggregation = getBaseAggregation(criteria);

  const getOverallSummary = callback =>
    baseAggregation.facet(OVERALL_FACET).exec(callback);

  const getJurisdictionSummary = callback =>
    baseAggregation.facet(JURISDICTION_FACET).exec(callback);

  const getStatusSummary = callback =>
    baseAggregation.facet(STATUS_FACET).exec(callback);

  const getPrioritySummary = callback =>
    baseAggregation.facet(PRIORITY_FACET).exec(callback);

  // const getServiceSummary = callback =>
  //   baseAggregation.facet(SERVICE_FACET).exec(callback);

  // const getServiceGroupSummary = callback =>
  //   baseAggregation.facet(SERVICE_GROUP_FACET).exec(callback);

  // const getServiceTypeSummary = callback =>
  //   baseAggregation.facet(SERVICE_TYPE_FACET).exec(callback);

  // const getWorkspaceSummary = callback =>
  //   baseAggregation.facet(WORKSPACE_FACET).exec(callback);

  // const getReportingMethodSummary = callback =>
  //   baseAggregation.facet(REPORTING_METHOD_FACET).exec(callback);

  // const getOperatorsSummary = callback =>
  //   baseAggregation.facet(OPERATOR_LEADERSBOARD_FACET).exec(callback);

  return parallel(
    [
      getOverallSummary,
      getJurisdictionSummary,
      getStatusSummary,
      getPrioritySummary,
    ],
    onResults
  );
};

export default getOverviewReport;
