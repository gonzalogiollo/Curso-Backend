import mongoose from 'mongoose';
const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true, minLength: 3, maxLength: 60 },
  last_name: { type: String, require: true, minLength: 3, maxLength: 60 },
  email: { type: String, require: true, unique: true, index: true },
  age: { type: Number, require: true, min: 18, max: 100 },
  password: { type: String, require: true },
  role: { type: String, require: false, default: 'USER' },
  carts: { type: [ { cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' } } ], default: [] },
  profile: {type: String },
  documents: {type: Array, default: [] },	
  last_connection: { type: String },	
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;