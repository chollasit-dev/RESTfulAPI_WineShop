const Customer = require("../models/customer");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

// Get
exports.index = async (req, res, next) => {
  const customer = await Customer.find();
  res.status(200).json({
    data: customer,
  });
};

// Register
exports.register = async (req, res, next) => {
  try {
    const { FirstName, LastName, City, Phone, Email, password } = req.body;

    const exitEmail = await Customer.findOne({ Email: Email });

    if (exitEmail) {
      const error = new Error("This Email is already exist!");
      error.statusCode = 400;
      throw error;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Input!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    } // validation

    let customer = new Customer();
    customer.FirstName = FirstName;
    customer.LastName = LastName;
    customer.City = City;
    customer.Phone = Phone;
    customer.Email = Email;
    customer.password = await customer.encryptPassword(password);

    await customer.save();

    res.status(201).json({
      message: "Success!",
    });
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Input!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    } // validation

    // check email exist
    const customer = await Customer.findOne({ Email: Email });

    if (!customer) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }

    // Check Password
    const isVaild = await customer.checkPassword(password);
    if (!isVaild) {
      const error = new Error("Incorrect Password!");
      error.statusCode = 401;
      throw error;
    }

    // Create Token
    const token = await jwt.sign(
      {
        id: customer._id,
        role: customer.role,
      },
      config.VERIFY_SIGNATURE,
      { expiresIn: "5 days" }
    );

    const expires_In = jwt.decode(token);
    res.status(200).json({
      access_token: token,
      expires_In: expires_In.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  // byID
  try {
    const { id } = req.params;

    const customer = await Customer.findOne({
      _id: id,
    });

    if (!customer) {
      const error = new Error("User Not Found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: customer,
      });
    }
  } catch (error) {
    next(error);
  }
};

// exports.profile = (req, res, next) => {
//   const { role, Name, Email } = req.customer;
//   res.status(200).json({
//     Name: Name,
//     Email: Email,
//     role: role,
//   });
// };

exports.destroy = async (req, res, next) => {
  // byID
  try {
    const { id } = req.params;

    const customer = await Customer.deleteOne({
      _id: id,
    });

    if (customer.deletedCount === 0) {
      const error = new Error("Can't delete, user not found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "User Delete!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, City, Phone, Email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Input!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let customer1 = new Customer();
    let enpassword = await customer1.encryptPassword(password);

    const customer = await Customer.updateOne(
      { _id: id },
      {
        FirstName: FirstName,
        LastName: LastName,
        City: City,
        Phone: Phone,
        Email: Email,
        password: enpassword,
      }
    );
    res.status(200).json({
      message: "Success!",
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
