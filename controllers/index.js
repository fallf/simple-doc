const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.send('<img src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png">');
});

module.exports = router;