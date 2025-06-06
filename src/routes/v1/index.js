const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const kycRoute = require('./kyc.route');
const accountRoute = require('./account.route');
const uploadRoute = require('./upload.route');
const depositRoute = require('./deposit.route');
const withdrawRoute = require('./withdraw.route');
const helpdeskRoute = require('./helpdesk.route');
const depdrawsRoute = require('./depdraws.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/kyc',
    route: kycRoute,
  },
  {
    path: '/account',
    route: accountRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '/deposit',
    route: depositRoute,
  },
  {
    path: '/withdraw',
    route: withdrawRoute,
  },
  {
    path: '/helpdesk',
    route: helpdeskRoute,
  },
  {
    path: '/depdraws',
    route: depdrawsRoute,
  },
];
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
