import head from 'lodash/head';
import merge from 'lodash/merge';

/**
 * @function
 * @name normalizeResultsForReports
 * @description Shape results data to a response format for reports
 *
 * @param {object[]} results Aggregation results
 * @returns {object} Response format to be returned
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const normalizeResultsForReports = results => {
  const defaultResults = {
    data: {},
  };

  const data = head(results);

  data.overall = head(data.overall);

  return merge({}, defaultResults, { data });
};

/**
 * @function
 * @name normalizeResultsForAggregations
 * @description Shape results data to a response format for aggregations
 *
 * @param {object[]} results Aggregation results
 * @returns {object} Response format to be returned
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const normalizeResultsForAggregations = results => {
  const defaultResults = {
    data: [],
  };

  return merge({}, defaultResults, { data: results });
};
