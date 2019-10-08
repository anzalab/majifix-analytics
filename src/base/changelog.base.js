/**
 * Base aggregation for Changelogs
 *
 * @author Benson Maruchu<benmaruchu@gmail.com>
 *
 * @version 0.1.0
 * @since 0.1.0
 */

/* dependencies */
import { model } from '@lykmapipo/mongoose-common';

/**
 * @function
 * @name getChangelogBaseAggregation
 * @description Create base aggregation for Changelog with all fields
 * looked up and un-winded for aggregation operations
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} aggregation instance
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const getChangelogBaseAggregation = criteria => {
  const ChangeLog = model('ChangeLog');

  return ChangeLog.lookup(criteria);
};

export default getChangelogBaseAggregation;
