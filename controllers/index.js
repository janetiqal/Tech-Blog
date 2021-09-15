const router= require('express').Router();

const apiRoutes= require("./api");
const homeRoute= require("./homeRoutes");
const dashboardRoute= require("./dashboardRoutes")

router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute)
router.use('/api', apiRoutes)

module.exports= router;
//TO DO LIST:
//GET dashboard routes, homeroutes done
//start getting templates down on dashboard and user handlebars--write the login route