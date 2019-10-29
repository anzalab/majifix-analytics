import {
  camelCase,
  flatten,
  head,
  map,
  merge,
  isNumber,
  omit,
  pick,
  isEmpty,
  upperFirst,
} from 'lodash';
import parseMs from 'parse-ms';

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
  if (!isNumber(time)) {
    return parseMs(0);
  }

  const averageTime = time >= 0 ? time : -time;

  return parseMs(averageTime);
};

/**
 * @function
 * @name normalizeMetricTimes
 * @description Normalize aggregation object with metric times to a standard
 * format. Also parse those times to human readable format
 *
 * @param {object} data Aggregation result object for a single facet or a single
 * object in a facet which returns an array
 * @returns {object} Object which is has merged data from the aggregation results
 * and parsed metrics times to human readable format
 *
 * @version 0.2.0
 * @since 0.5.0
 */
export const normalizeMetricTimes = data => {
  const keys = [
    'confirmTime',
    'assignTime',
    'attendTime',
    'completeTime',
    'verifyTime',
    'approveTime',
    'resolveTime',
    'lateTime',
    'callTime',
    'workTime',
  ];

  const times = map(keys, key => ({
    [key]: {
      minimum: normalizeTime(data[`minimum${upperFirst(key)}`]),
      maximum: normalizeTime(data[`maximum${upperFirst(key)}`]),
      average: normalizeTime(data[`average${upperFirst(key)}`]),
    },
  }));

  const fieldsToOmit = flatten(
    map(keys, key => {
      return [
        `minimum${upperFirst(key)}`,
        `maximum${upperFirst(key)}`,
        `average${upperFirst(key)}`,
      ];
    })
  );

  const strippedObject = omit(data, fieldsToOmit); // remove unused time fields after normalization

  return merge({}, strippedObject, ...times);
};

/**
 * @function
 * @name prepareReportResponse
 * @description Prepare response for Reports by normalizing response shape and average times
 *
 * @param {object} results Aggregation results
 * @returns {object} Normalized response object
 *
 * @version 0.2.0
 * @since 0.2.0
 */
export const prepareReportResponse = results => {
  const defaultResults = {
    data: {},
  };

  const data = merge(...results);

  if (!isEmpty(data.overall)) {
    data.overall = head(data.overall);

    data.overall = normalizeMetricTimes(data.overall);
  }

  if (data.jurisdictions) {
    data.jurisdictions = map(data.jurisdictions, normalizeMetricTimes);
  }

  if (data.priorities) {
    data.priorities = map(data.priorities, normalizeMetricTimes);
  }

  if (data.services) {
    data.services = map(data.services, normalizeMetricTimes);
  }

  if (data.groups) {
    data.groups = map(data.groups, normalizeMetricTimes);
  }

  if (data.types) {
    data.types = map(data.types, normalizeMetricTimes);
  }

  if (data.zones) {
    data.zones = map(data.zones, normalizeMetricTimes);
  }

  if (data.assignees) {
    data.assignees = map(data.assignees, assignee => {
      return { ...assignee, workTime: normalizeTime(assignee.workTime) };
    });
  }

  // if (data.methods) {
  //   data.methods = map(data.methods, normalizeObjectTimes);
  // }

  return { ...defaultResults, data };
};

/**
 * @function
 * @name getTimeFacet
 * @description Generate list of expression to be executed for given time i.e
 * minimum, maximum and average time.
 *
 * @param {string} metricTime Time metric to be used in facet
 * @returns {object} Return a map of expression to be executed for provided time
 *
 * @version 0.1.0
 * @since 0.10.7
 * @example
 * const ASSIGN_TIME_FACET = getTimeFacet('assignTime');
 */
export const getTimeFacet = metricTime => {
  const time = camelCase(metricTime);
  return {
    [`minimum${upperFirst(time)}`]: { $min: `$${time}` },
    [`maximum${upperFirst(time)}`]: { $max: `$${time}` },
    [`average${upperFirst(time)}`]: { $avg: `$${time}` },
  };
};

/**
 * @function
 * @name getFacet
 * @description Get final facet based on selected facet keys
 *
 * @param {object} facet Default facet for a report
 * @param {string[]} facetKeys keys to be in the final facet
 *
 * @returns {object} final facet to be executed
 *
 * @version 0.1.0
 * @since 0.7.0
 */
export const getFacet = (facet, facetKeys) => {
  const newFacet = pick(facet, facetKeys);

  if (isEmpty(newFacet)) {
    return facet;
  }

  return newFacet;
};
