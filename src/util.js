import head from 'lodash/head';
import merge from 'lodash/merge';
import map from 'lodash/map';
import parseMs from 'parse-ms';

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

/**
 * @function
 * @name normalizeTime
 * @description Normalize average times which are in milliseconds to a human
 * readable object
 *
 * @param {number} time Time in milliseconds
 * @returns {object} time object that have days,hours,minutes, seconds and e.t.c
 *
 * @version 0.1.0
 * @since 0.2.0
 */
export const normalizeTime = time => {
  const averageTime = time >= 0 ? time : -time;

  return parseMs(averageTime);
};

/**
 * @function
 * @name normalizeObjectTimes
 * @description Normalize times in a provided object (item)
 *
 * @param {object} item Object with times to be normalized
 * @returns {object} Object with averageResolve time and averageAttend Time parse
 *
 * @version 0.1.0
 * @since 0.2.0
 */
export const normalizeObjectTimes = item => {
  const normalizeObject = {};

  normalizeObject.averageResolveTime = normalizeTime(item.averageResolveTime);

  normalizeObject.averageAttendTime = normalizeTime(item.averageAttendTime);

  return { ...item, ...normalizeObject };
};

/**
 * @function
 * @name prepareReportResponse
 * @description Prepare response for Reports by normalizing response shape and average times
 *
 * @param {object} results Aggregation results
 * @returns {object} Normalized response object
 *
 * @version 0.1.0
 * @since 0.2.0
 */
export const prepareReportResponse = results => {
  const defaultResults = {
    data: {},
  };

  const data = head(results);

  data.overall = head(data.overall);

  if (data.overall) {
    data.overall = normalizeObjectTimes(data.overall);
  }

  if (data.jurisdictions) {
    data.jurisdictions = map(data.jurisdictions, normalizeObjectTimes);
  }

  if (data.priorities) {
    data.priorities = map(data.priorities, normalizeObjectTimes);
  }

  if (data.services) {
    data.services = map(data.services, normalizeObjectTimes);
  }

  if (data.groups) {
    data.groups = map(data.groups, normalizeObjectTimes);
  }

  if (data.types) {
    data.types = map(data.types, normalizeObjectTimes);
  }

  if (data.methods) {
    data.methods = map(data.methods, normalizeObjectTimes);
  }

  return { ...defaultResults, data };
};
