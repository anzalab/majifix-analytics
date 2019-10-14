/**
 * This is standing report based on service request
 *
 * This reports provides count of service requests per jurisdictions,
 * per group, per service, per status and per priority
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.8.0
 */

/* dependencies */
import getServiceRequestBaseAggregation from '../base/servicerequest.base';

/**
 * @function
 * @name getStandingReport
 * @description Generate standing report based on provided criteria
 *
 * @param {object} criteria Criteria condition to be applied in $match
 * @param {object} onResults Callback when aggregation operation finishes
 * @returns {object} executed aggregation
 *
 * @version 0.1.0
 * @since 0.8.0
 *
 * @example
 *  getStandingReport(criteria, function(error, data){
 *    ...
 *  });
 */
const getStandingReport = (criteria, onResults) => {
  const baseAggregation = getServiceRequestBaseAggregation(criteria);

  return baseAggregation
    .group({
      _id: {
        jurisdiction: '$jurisdiction.name',
        group: '$group.name.en',
        service: '$service.name.en',
        status: '$status.name.en',
        priority: '$priority.name.en',
      },
      jurisdiction: { $first: '$jurisdiction' },
      group: { $first: '$group' },
      service: { $first: '$service' },
      status: { $first: '$status' },
      priority: { $first: '$priority' },
      count: { $sum: 1 },
    })
    .project({
      _id: 0,
      count: 1,
      jurisdiction: { name: 1, code: 1, color: 1 },
      group: { name: 1, code: 1, color: 1 },
      service: { name: 1, code: 1, color: 1 },
      status: { name: 1, color: 1, weight: 1 },
      priority: { name: 1, color: 1, weight: 1 },
    })
    .exec(onResults);
};

export default getStandingReport;
