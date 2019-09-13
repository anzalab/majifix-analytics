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

/**
 * @function
 * @name getBaseAggregation
 * @description Create base aggregation for Service Requests with all fields
 * looked up and un-winded for aggregation operations
 *
 * Also this adds more fields to aid in computation of aggregated data
 *
 * @param {object} criteria Criteria conditions which will be applied in $match
 * @returns {object} aggregation instance
 *
 * @version 0.2.0
 * @since 0.1.0
 */
const getBaseAggregation = criteria => {
  const ServiceRequest = model('ServiceRequest');

  return ServiceRequest.lookup(criteria)
    .addFields({
      /**
       * Flag for unconfirmed service request. This shows all service requests
       * which have been reporting via mobileApp, website, USSD and still they
       * are not confirmed yet by an operator.
       *
       * A service request is flagged as unconfirmed service request when it
       * has not been confirmed or resolved yet.
       */
      unconfirmed: {
        $cond: {
          if: { $and: [{ $not: '$resolvedAt' }, { $not: '$confirmedAt' }] },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for new service request. i.e open service request.
       *
       * A service request is flagged as new service request when it
       * has been confirmed but not assigned, attended,completed, verified,
       * approved, reopened or resolved yet.
       */
      new: {
        $cond: {
          if: {
            $and: [
              '$confirmedAt',
              { $not: '$resolvedAt' },
              { $not: '$assignedAt' },
              { $not: '$attendedAt' },
              { $not: '$completedAt' },
              { $not: '$verifiedAt' },
              { $not: '$approvedAt' },
              { $not: '$reopenedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for assigned service request. i.e assigned to someone.
       *
       * A service request is flagged as assigned service request when it
       * has been assigned but not attended or resolved yet.
       */
      assigned: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$assignedAt',
              { $not: '$attendedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for attended service request. i.e someone is attending the service request.
       *
       * A service request is flagged as attended service request when it
       * has been assigned and attended but not completed or resolved yet.
       */
      attended: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$assignedAt',
              '$attendedAt',
              { $not: '$completedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for completed service request. i.e someone have finished working
       * on the service request.
       *
       * A service request is flagged as completed service request when it
       * has been attended and completed but not verified or resolved yet.
       */
      completed: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$attendedAt',
              '$completedAt',
              { $not: '$verifiedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for verified service request. i.e someone have verified the
       * service request.
       *
       * A service request is flagged as verified service request when it
       * has been completed and verified but not approved or resolved yet.
       */
      verified: {
        $cond: {
          if: {
            $and: [
              { $not: '$resolvedAt' },
              '$completedAt',
              '$verifiedAt',
              { $not: '$approvedAt' },
            ],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for approved service request. i.e someone have approved the
       * service request.
       *
       * A service request is flagged as approved service request when it
       * has been verified and approved but not resolved yet.
       */
      approved: {
        $cond: {
          if: {
            $and: [{ $not: '$resolvedAt' }, '$verifiedAt', '$approvedAt'],
          },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for pending service request i.e service request which is confirmed but
       * not resolved yet
       *
       * A service request is flagged as pending service request when it
       * has been confirmed but not resolved yet.
       */
      pending: {
        $cond: {
          if: { $and: [{ $not: '$resolvedAt' }, '$confirmedAt'] },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for resolved service request i.e service request which is resolved
       *
       * A service request is flagged as resolved service request when it
       * has been resolved.
       */
      resolved: {
        $cond: { if: { $not: '$resolvedAt' }, then: 0, else: 1 },
      },

      /**
       * Flag for reopened service request i.e service request which have been
       * reopened after been resolved
       *
       * A service request is flagged as reopened service request when it
       * has been confirmed and reopened.
       */
      reopened: {
        $cond: {
          if: { $and: ['$reopenedAt', '$confirmedAt'] },
          then: 1,
          else: 0,
        },
      },

      /**
       * Flag for late service request i.e service request passed it's SLA without
       * being resolved
       *
       * Service request is flagged as late service request when it has been either
       * resolved pass it's SLA or not resolved and it's pass it's SLA
       */
      late: {
        $cond: {
          if: {
            $or: [
              {
                $and: [
                  { $not: '$resolvedAt' },
                  '$expectedAt',
                  { $gt: [new Date(), '$expectedAt'] },
                ],
              },
              {
                $and: ['$expectedAt', { $gt: ['$resolvedAt', '$expectedAt'] }],
              },
            ],
          },
          then: 1,
          else: 0,
        },
      },
    })
    .addFields({
      /**
       * Time difference between when service request was reported and when it was
       * confirmed by an operator or responsible party.
       *
       * This metric calculate how much time does it take for an organization
       * to confirm/respond to issues which have been reported via channels
       * which doesn't involve operator intervention. i.e USSD, Mobile App, Bot
       * and e.t.c
       */
      confirmTime: { $subtract: ['$confirmedAt', '$createdAt'] },

      /**
       * Time difference between expected time to resolve the service request
       * and current date if not resolved or resolvedAt if resolved pass it SLA.
       *
       * This time will indicate if the service request is late or not base on
       * the SLA(Service Level Agreement) time set per service request nature
       */
      lateTime: {
        $cond: {
          if: { $eq: ['$late', 1] },
          then: {
            $cond: {
              if: '$resolvedAt',
              then: { $subtract: ['$resolvedAt', '$expectedAt'] },
              else: { $subtract: [new Date(), '$expectedAt'] },
            },
          },
          else: null,
        },
      },

      /**
       * This is the time for a confirmed service request to be assigned to
       * a responsible party
       */
      assignTime: { $subtract: ['$assignedAt', '$confirmedAt'] },

      /**
       * This is the time for a assigned service request to be attended
       */
      attendTime: { $subtract: ['$attendedAt', '$assignedAt'] },

      /**
       * This is the time for a attended service request to be completed
       */
      completeTime: { $subtract: ['$completedAt', '$attendedAt'] },

      /**
       * This is the time for a completed service request to be verified
       */
      verifyTime: { $subtract: ['$verifiedAt', '$completedAt'] },

      /**
       * This is the time for a verified service request to be approved
       */
      approveTime: { $subtract: ['$approvedAt', '$verifiedAt'] },

      /**
       * This is the time for an approved service request to be marked as resolved
       */
      resolveTime: { $subtract: ['$resolvedAt', '$createdAt'] },
    });
};

export default getBaseAggregation;
