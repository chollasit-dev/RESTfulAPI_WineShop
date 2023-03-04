const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandCommpanySchema = new Schema(
  {
    BrandName: { type: String, require: true, trim: true },
    City: { type: String, require: true, trim: true },
    Country: { type: String, require: true, trim: true },
  },
  { collection: "BrandCompany", toJSON: { virtuals: true } }
);
brandCommpanySchema.virtual("Wine", {
  ref: "Wine",
  localField: "_id",
  foreignField: "BrandName",
});
const brand = mongoose.model("BrandCompany", brandCommpanySchema);

module.exports = brand;
