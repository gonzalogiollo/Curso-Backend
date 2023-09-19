import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const mockingCollection = 'mocking';

const mockingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: Array,
    default: [],
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  status: Boolean,
  category: {
    type: String,
    required: true,
  },
});


mockingSchema.plugin(mongoosePaginate);

const mockingModel = mongoose.model(mockingCollection, mockingSchema);

export default mockingModel;