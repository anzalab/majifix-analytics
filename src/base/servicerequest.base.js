/**
 * Base aggregation for service requests
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 *
 * @version 0.1.0
 * @since 0.1.0
 */

/* dependencies */
import { model } from '@lykmapipo/mongoose-common';

/* declarations */

/**
 * @function
 * @name getBaseAggregation
 * @description Create base aggregation for Service Requests with all fields
 * looked up and un-winded for aggregation operations
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} aggregation instance
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const getBaseAggregation = criteria => {
  const ServiceRequest = model('ServiceRequest');

  return ServiceRequest.lookup(criteria).addFields({
    pending: {
      $cond: { if: { $not: '$resolvedAt' }, then: 1, else: 0 },
    },
    unattended: {
      $cond: { if: { $not: '$operator' }, then: 1, else: 0 },
    },
    resolved: {
      $cond: { if: { $not: '$resolvedAt' }, then: 0, else: 1 },
    },
    reopened: {},
    assigned: {
      $cond: {
        // missing checking assignedAt if it exists
        if: {
          $or: [
            { $not: '$attendedAt' },
            { $not: '$verifiedAt' },
            { $not: '$completedAt' },
            { $not: '$approvedAt' },
          ],
        },
        then: 1,
        else: 0,
      },
    },
    attended: {},
    verified: {},
    completed: {},
    approved: {},
  });
};

export default getBaseAggregation;
