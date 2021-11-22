const router = require('express').Router();

const userRoutes = require('./user-route');
const patientRoutes = require('./patient-route');
const roleRoutes = require('./role-route');

router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/role', roleRoutes);

module.exports= router;