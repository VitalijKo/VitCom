import { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema({
	name: {
		type: String,
		max: 128,
		required: true
	},
	description: {
		type: String,
		max: 4096,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		max: 128,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;
