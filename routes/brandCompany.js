var express = require("express");
var router = express.Router();
const brandCompanyController = require("../controllers/brandCompanyController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", brandCompanyController.index);

router.get("/:id", brandCompanyController.findbyID);

router.post(
  "/insert",
  [
    body("BrandName").not().isEmpty().withMessage("Please insert brand name!"),
    body("City").not().isEmpty().withMessage("Please insert city!"),
    body("Country").not().isEmpty().withMessage("Please insert country!"),
  ],
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  brandCompanyController.insert
);

router.delete(
  "/delete/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  brandCompanyController.destroy
);

router.put(
  "/update/:id",
  [
    body("BrandName").not().isEmpty().withMessage("Please insert brand name!"),
    body("City").not().isEmpty().withMessage("Please insert city!"),
    body("Country").not().isEmpty().withMessage("Please insert country!"),
  ],
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  brandCompanyController.update
);

module.exports = router;
