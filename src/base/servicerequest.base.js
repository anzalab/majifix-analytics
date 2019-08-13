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

const getBaseAggregation = () => {
  const ServiceRequest = model('ServiceRequest');

  return ServiceRequest.lookup();
};

export default getBaseAggregation;
