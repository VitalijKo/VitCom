import { initDB } from '../../lib/db';
import Product from '../../models/Product';
import Order from '../../models/Order';
import stripe from 'stripe';

const stripe_client = stripe(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res) {
	await initDB();

	if (req.method !== 'POST') return res.status(405).json('Method not allowed.');

	const { name, email, city, zipCode } = req.body;
	const products_ids = req.body.products.split(',');
	const unique_ids = [...new Set(products_ids)];
	const products = await Product.find({_id: {$in: unique_ids}}).exec();

	let line_items = [];

	for (let product_id of unique_ids) {
		const quantity = products_ids.filter(id => id === product_id).length;
		const product = products.find(product => product._id.toString() === product_id)
	
		line_items.push({
			quantity,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.name
				},
				unit_amount: product.price * 100,
			}
		});
	}

	const order = await Order.create({
		name,
		email,
		city,
		zipCode,
		products: line_items
	});


	const session = await stripe_client.checkout.sessions.create({
		line_items: line_items,
		mode: 'payment',
		customer_email: email,
		success_url: req.headers.origin + '/?success=true',
		cancel_url: req.headers.origin + '/?canceled=true',
		metadata: {
			orderId: order._id.toString()
		}
	});

	res.redirect(303, session.url);
}
