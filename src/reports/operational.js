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
import { parallel } from 'async';
import { flattenDeep } from 'lodash';
import getServiceRequestBaseAggregation, {
  METRIC_TIMES,
} from '../base/servicerequest.base';
import getChangelogBaseAggregation from '../base/changelog.base';
import { getFacet } from '../util';
import {
  OVERALL_FACET,
  SERVICE_FACET,
  ITEM_FACET,
  WORKSPACE_FACET,
  ZONE_FACET,
  ASSIGNEE_LEADERSBOARD_FACET,
} from '../base/facets';

const OPERATIONAL_FACET = {
  ...OVERALL_FACET,
  ...SERVICE_FACET,
  ...WORKSPACE_FACET,
  ...ZONE_FACET,
  ...ASSIGNEE_LEADERSBOARD_FACET,
};

/**
 * @function
 * @name getOperationalReport
 * @description Generate operational report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {string[]} facetKeys Contain list of facets key to be used to generate report
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.2.1
 * @since 0.1.0
 *
 * @example
 *  getOperationalReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getOperationalReport = (criteria, facetKeys, onResults) => {
  const baseAggregation = getServiceRequestBaseAggregation(
    criteria,
    METRIC_TIMES
  );
  const changelogBaseAggregation = getChangelogBaseAggregation(criteria);

  const FACET = getFacet(OPERATIONAL_FACET, facetKeys);

  const getChangelogReport = next =>
    changelogBaseAggregation.facet(ITEM_FACET).exec(next);

  const getServiceRequestReport = next =>
    baseAggregation.facet(FACET).exec(next);

  return parallel(
    [getChangelogReport, getServiceRequestReport],
    (error, results) => {
      return onResults(error, flattenDeep(results));
    }
  );
};

export default getOperationalReport;
