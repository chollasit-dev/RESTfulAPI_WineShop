var express = require("express");
var router = express.Router();
const wineController = require("../controllers/wineController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", wineController.index);

router.get("/:id", wineController.findbyID);

router.post(
  "/insert",
  [
    body("WineName").not().isEmpty().withMessage("Please insert wine name!"),
    body("PriceBaht")
      .not()
      .isEmpty()
      .withMessage("Please insert price in Baht!")
      .isDecimal()
      .withMessage("Please insert value in decimal form!"),
    body(),
    body("BrandName").not().isEmpty().withMessage("Please insert brand name!"),
  ],
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  wineController.insert
);

router.delete(
  "/delete/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  wineController.destroy
);

router.put(
  "/update/:id",
  [
    body("WineName").not().isEmpty().withMessage("Please insert wine name!"),
    body("PriceBaht")
      .not()
      .isEmpty()
      .withMessage("Please insert price in Baht!"),
    body("BrandName").not().isEmpty().withMessage("Please insert brand name!"),
  ],
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  wineController.update
);

module.exports = router;
