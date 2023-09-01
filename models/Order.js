import { Schema, models, model } from 'mongoose';

const OrderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	zipCode: {
		type: Number,
		required: true
	},
	products: {
		type: Object
	},
	paid: {
		type: Boolean,
		default: false
	}
}, { 
	timestamps: true
});

const Order = models?.Order || model('Order', OrderSchema);

export default Order;
