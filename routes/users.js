const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");

// Show register page
router.get("/register", UserController.getRegisterPage);

// Register a user
router.post("/register", UserController.registerUser);

// Show login page
router.get("/login", UserController.getLoginPage);

// Login a user
router.post("/login", UserController.loginUser);

// Logout a user
router.get("/logout", UserController.logoutUser);

// Perform Facebook auth
router.get("/facebook-login", UserController.facebookLogin);

// Get Facebook auth response
router.get("/facebook-login/callback", UserController.facebookLoginCallback);
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