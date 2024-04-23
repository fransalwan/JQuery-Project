const express = require("express");
const CuisinesController = require("../controllers/CuisineController");
const CategoryController = require("../controllers/CategoryController");
const HistoryController = require("../controllers/HistoryController");
const { authorization } = require("../middlewares/authorization");
const { authorizationStatus } = require("../middlewares/authorizationStatus");
const router = express.Router();

router.get("/cuisines", CuisinesController.getAllCuisines);
router.post("/cuisines", CuisinesController.addNewCuisine);
router.get("/cuisines/:id", CuisinesController.detailCuisine);
router.put("/cuisines/:id", CuisinesController.editCuisine);
router.patch(
  "/cuisines/:id",
  authorizationStatus,
  CuisinesController.editStatus
);
router.delete("/cuisines/:id", authorization, CuisinesController.deleteCuisine);

router.get("/categories", CategoryController.getAllCategories);
router.post("/categories", CategoryController.addNewCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

router.get("/histories", HistoryController.getAllHistory);

module.exports = router;
