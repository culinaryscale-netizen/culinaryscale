import { Schema, model } from "mongoose";

const TasteAdjustmentConfigSchema = new Schema(
  {
    mildReductionPercentage: { type: Number, default: 20 },
    spicyIncreasePercentage: { type: Number, default: 30 },
    indianBoostIncreasePercentage: { type: Number, default: 60 },
  },
  { _id: false }
);

const IngredientSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    quantity: { type: Number },
    unit: { type: String },
    type: { type: String, enum: ["NORMAL", "CONSTANT"], default: "NORMAL" },
    constantLimit: { type: Number, default: 6 },
    isTasteAdjustable: { type: Boolean, default: false },
    tasteAdjustmentConfig: {
      type: TasteAdjustmentConfigSchema,
      default: () => ({}),
    },
    imageUrl: { type: String, default: "" },
  },
  { _id: false }
);

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    baseServings: { type: Number, required: true },
    imageUrl: { type: String, default: "" },
    ingredients: { type: [IngredientSchema], default: [] },
    steps: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model("Recipe", RecipeSchema);
