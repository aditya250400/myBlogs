const express = require("express");
const router = express.Router();

const IndexControllers = require("../controllers/");

const checkAuthenticationMiddleware = require("../middlewares/checkAuthentication");

// Go to home page
router.get("/", IndexControllers.getHomePage);

// Go to dashboard
router.get(
  "/blogs",
  checkAuthenticationMiddleware,
  IndexControllers.getDashboardPage
);
router.get('/1', (req, res) => {
  res.render('1');
});
router.get('/2', (req, res) => {
  res.render('2');
});
router.get('/3', (req, res) => {
  res.render('3');
});
router.get('/4', (req, res) => {
  res.render('4');
});

module.exports = router;