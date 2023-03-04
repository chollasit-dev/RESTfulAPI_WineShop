const BrandCompany = require("../models/brandCompany");
const { validationResult, body } = require("express-validator");

// Get
exports.index = async (req, res, next) => {
  const brandCompany = await BrandCompany.find();
  res.status(200).json({
    data: brandCompany,
  });
};

exports.findbyID = async (req, res, next) => {
  // byID
  try {
    const { id } = req.params;

    const brandCompany = await BrandCompany.findOne({
      _id: id,
    });

    if (!brandCompany) {
      const error = new Error("Brand Company Not Found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: brandCompany,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { BrandName, City, Country } = req.body;

    const exitName = await BrandCompany.findOne({ BrandName: BrandName });

    if (exitName) {
      const error = new Error("This brand is already exist!");
      error.statusCode = 400;
      throw error;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Data!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let brandCompany = new BrandCompany();
    (brandCompany.BrandName = BrandName),
      (brandCompany.City = City),
      (brandCompany.Country = Country);

    await brandCompany.save();

    res.status(200).json({
      message: "Success!",
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  // byID
  try {
    const { id } = req.params;

    const brandCompany = await BrandCompany.deleteOne({
      _id: id,
    });

    if (brandCompany.deletedCount === 0) {
      const error = new Error("Can't delete, brand company not found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "Brand Company Deleted!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { BrandName, City, Country } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Input!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const brandCompany = await BrandCompany.updateOne(
      { _id: id },
      {
        BrandName: BrandName,
        City: City,
        Country: Country,
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
