import { initDB } from '../../lib/db';
import Order from '../../models/Order';
import stripe from 'stripe';
import { buffer } from 'micro';

const stripe_client = stripe(process.env.STRIPE_SECRET_KEY);
const secret = process.env.STRIPE_SIGNING_SECRET;

export default async function handle(req, res) {
	await initDB();

	const payload = await buffer(req);
	const signature = req.headers['stripe-signature'];
	const event = stripe_client.webhooks.constructEvent(payload, signature, secret);

	if (event?.type === 'checkout.session.completed') {
		const metadata = event.data?.object?.metadata;
		const paymentStatus = event.data?.object?.payment_status;

		if (metadata?.orderId && paymentStatus === 'paid') {
			await Order.findByIdAndUpdate(metadata.orderId, {
				paid: true
			});
		}
	}

	res.json('OK.');
}

export const config = {
	api: {
		bodyParser: false
	}
}
