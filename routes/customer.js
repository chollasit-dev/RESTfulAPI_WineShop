var express = require("express");
var router = express.Router();
const customerRouter = require("../controllers/customerController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

// Get
router.get(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  customerRouter.index
);

// Register
router.post(
  "/register",
  [
    body("FirstName")
      .not()
      .isEmpty()
      .withMessage("Please type your first name!"),
    body("LastName").not().isEmpty().withMessage("Please type your last name!"),
    body("City").not().isEmpty().withMessage("Please type your city!"),
    body("Phone").not().isEmpty().withMessage("Please type your phone number!"),
    body("Email")
      .not()
      .isEmpty()
      .withMessage("Please type your Email!")
      .isEmail()
      .withMessage("Incorrect Email Format!"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type your password!")
      .isLength({ min: 5 })
      .withMessage("Password length must be 5 letters up!"),
  ],
  customerRouter.register
);

// Login
router.post(
  "/login",
  [
    body("Email")
      .not()
      .isEmpty()
      .withMessage("Please type your Email!")
      .isEmail()
      .withMessage("Incorrect Email Format!"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type your password!")
      .isLength({ min: 5 })
      .withMessage("Password length must be 5 letters up!"),
  ],
  customerRouter.login
);

// GetbyID
router.get(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  customerRouter.show
);

// router.get("/me", [passportJWT.isLogin], customerRouter.profile);

router.delete(
  "/delete/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  customerRouter.destroy
);

// Update
router.put(
  "/update/:id",
  [
    body("FirstName")
      .not()
      .isEmpty()
      .withMessage("Please type your first name!"),
    body("LastName").not().isEmpty().withMessage("Please type your last name!"),
    body("City").not().isEmpty().withMessage("Please type your city!"),
    body("Phone").not().isEmpty().withMessage("Please type your phone number!"),
    body("Email")
      .not()
      .isEmpty()
      .withMessage("Please type your Email!")
      .isEmail()
      .withMessage("Incorrect Email Format!"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type your password!")
      .isLength({ min: 5 })
      .withMessage("Password length must be 5 letters up!"),
  ],
  [passportJWT.isLogin],
  customerRouter.update
);

module.exports = router;
