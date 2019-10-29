/**
 * Base aggregation for service request for trending reports
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 *
 * @version 0.1.0
 * @since 0.11.0
 */

/* dependencies */
import { isEmpty } from 'lodash';
import { model } from '@lykmapipo/mongoose-common';

/**
 * @function
 * @name getServiceRequestTrendingAggregation
 * @description Base Aggregation for service request trending reports
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} Service request aggregation instance
 *
 * @version 0.1.0
 * @since 0.11.0
 */
const getServiceRequestTrendingAggregation = criteria => {
  const ServiceRequest = model('ServiceRequest');

  const base = ServiceRequest.aggregate();

  if (isEmpty(criteria)) {
    base.match(criteria);
  }

  base.addFields({
    year: { $year: '$createdAt' },
    month: { $month: '$createdAt' },
    weekDay: {
      $dayOfWeek: '$createdAt',
    },
    day: { $dayOfMonth: '$createdAt' },
    hour: {
      $hour: '$createdAt',
    },
  });

  return base;
};

export default getServiceRequestTrendingAggregation;
