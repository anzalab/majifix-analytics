/**
 * This is trending report based on service request
 *
 * This reports provides count of service requests
 * base on reportedAt(createdAt) per year, hour, day
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @version 0.1.0
 * @since 0.11.0
 */

/* dependencies */
import getServiceRequestTrendingAggregation from '../base/trending.base';
import {
  TRENDING_HOUR_PER_DAY,
  TRENDING_MONTH_PER_YEAR_FACET,
  TRENDING_PER_YEAR,
} from '../base/facets';

const FACET = {
  ...TRENDING_PER_YEAR,
  ...TRENDING_MONTH_PER_YEAR_FACET,
  ...TRENDING_HOUR_PER_DAY,
};

const getTrendingReport = (criteria, onResults) => {
  const baseAggregation = getServiceRequestTrendingAggregation(criteria);

  baseAggregation.facet(FACET).exec(onResults);
};

export default getTrendingReport;
