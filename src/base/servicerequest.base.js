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
 * looked up and unwinded for aggregation operations
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} aggregagtion instance
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const getBaseAggregation = criteria => {
  const ServiceRequest = model('ServiceRequest');

  return ServiceRequest.lookup(criteria);
};

export default getBaseAggregation;
