import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;
const interfaceSchema = Schema.Types;

interface IOffer {
  _id: Types.ObjectId;
  description: string;
  baseOffset: string;
}

const offerSchema = new Schema<IOffer>({
  description: {
    type: interfaceSchema.String,
    required: true,
  },
  baseOffset: {
    type: interfaceSchema.String,
    required: true,
  },
});

const OfferModel = mongoose.model("offer", offerSchema);

export { OfferModel, IOffer };
