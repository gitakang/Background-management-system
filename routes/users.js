var express = require('express');
var router = express.Router();
var userController = require("../controllers/UserController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/check",userController.checkLogin);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/logout",userController.logout);
router.get("/checkUsername",userController.checkUsername);



module.exports = router;
