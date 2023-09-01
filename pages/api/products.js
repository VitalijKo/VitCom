import { initDB } from '../../lib/db';
import Product from '../../models/Product';

export async function getAllProducts() {
	return Product.find().exec();
}

export async function getSelectedProducts(ids) {
	return Product.find({'_id': {$in: ids.split(',')}}).exec();
}

export default async function handle(req, res) {
	await initDB();

	const { ids } = req.query;

	ids ? res.json(await getSelectedProducts(ids)) : res.json(await getAllProducts());
}
