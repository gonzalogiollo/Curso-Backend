import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
	product: {
		type: [{
			pid:{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products'
			},
			quantity: Number
		}],
		default: [],
		require: true,
	},
})

cartSchema.pre('find', function () {
	this.populate('product.pid');
});
  
cartSchema.pre('findOne', function () {
	this.populate('product.pid');
});

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel;
