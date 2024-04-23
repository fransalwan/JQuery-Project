const express = require("express");
const custAuthentication = require("../middlewares/custAuthentication");
const CustomerController = require("../controllers/CustomerController");
const router = express.Router();

router.get("/cust/cuisines", CustomerController.getAllCuisines);
router.get("/cust/cuisines/:id", CustomerController.getCuisineById);

router.use(custAuthentication);

router.get("/profile", CustomerController.getProfileCustomer);
router.get("/subscription", CustomerController.editStatusSubscribtion);
router.get("/cust/favorites", CustomerController.getAllFavorites);
router.post("/cust/favorites/:id", CustomerController.addFavoriteById);

module.exports = router;
