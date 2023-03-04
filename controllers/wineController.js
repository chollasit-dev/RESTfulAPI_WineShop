const Wine = require("../models/wine");
const { validationResult, body } = require("express-validator");

// Get
exports.index = async (req, res, next) => {
  const wine = await Wine.find();
  res.status(200).json({
    data: wine,
  });
};

exports.findbyID = async (req, res, next) => {
  // byID
  try {
    const { id } = req.params;

    const wine = await Wine.findOne({
      _id: id,
    });

    if (!wine) {
      const error = new Error("Wine Not Found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: wine,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { WineName, PriceBaht, BrandName } = req.body;

    const exitName = await Wine.findOne({ WineName: WineName });

    if (exitName) {
      const error = new Error("This wine is already exist!");
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

    let wine = new Wine();
    (wine.WineName = WineName),
      (wine.PriceBaht = PriceBaht),
      (wine.BrandName = BrandName);

    await wine.save();

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

    const wine = await Wine.deleteOne({
      _id: id,
    });

    if (wine.deletedCount === 0) {
      const error = new Error("Can't delete, wine not found!");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "Wine Deleted!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { WineName, PriceBaht, BrandName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Incorrect Input!");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const wine = await Wine.updateOne(
      { _id: id },
      {
        WineName: WineName,
        PriceBaht: PriceBaht,
        BrandName: BrandName,
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
