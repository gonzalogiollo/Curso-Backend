import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
//definimos la colleccion
const productCollection = 'products';


const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: false,
		default: 0,
	},
	thumbnail: {
		type: String,
		required: false,
		default: ''
	},
	code: {
		type: Number,
		required: true,
		unique: true,	
	},
	stock: {
		type: Number,
		required: true,
		default: 0,
	},
	status: {
		type: Boolean,
		required: false
	},
	category: {
		type: String,
		required: false
	},
	owner: {	
		type: String,	
		default: 'admin',
		},
})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;
