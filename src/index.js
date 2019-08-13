/**
 * @name majifix-analytics
 * @description A module for analytics and visualizations of majifix data
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { app } = require('@codetanzania/majifix-analytics');
 *
 * ...
 *
 * app.start();
 */

/* dependencies */
import { pkg } from '@lykmapipo/common';
import router from './http.router';

const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

// extract api version
const apiVersion = router.version;

export { apiVersion, info, router };
