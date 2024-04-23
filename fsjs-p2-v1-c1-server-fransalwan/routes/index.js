const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const cuisineRouter = require("../routes/cuisines");
const customerRouter = require("../routes/customers");
const router = express.Router();

// Customer
router.post("/cust/register", UserController.custRegister);
router.post("/cust/login", UserController.custLogin);
router.post("/cust/OAuthLogin", UserController.custOAuthLogin);
router.use(customerRouter);

// Admin
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/OAuthLogin", UserController.OAuthLogin);

router.use(authentication);
router.use(cuisineRouter);

module.exports = router;
