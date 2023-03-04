const { Decimal128 } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema(
  {
    WineName: { type: String, require: true, trim: true },
    PriceBaht: { type: Decimal128, require: true },
    BrandName: { type: Schema.Types.ObjectID, ref: "Brand" },
  },
  { collection: "Wine" }
);

const wine = mongoose.model("Wine", wineSchema);

module.exports = wine;
