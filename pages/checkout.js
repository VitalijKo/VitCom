import Layout from '../components/Layout';
import { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../components/ProductsContext';

export default function Checkout() {
	const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [zipCode, setZipCode] = useState('');

	useEffect(() => {
		const unique_ids = [...new Set(selectedProducts)];

		fetch('/api/products?ids=' + unique_ids.join(',')).then(res => res.json()).then(res => {
			setProducts(res);
		});
	}, [selectedProducts]);

	function less(id) {
		const position = selectedProducts.indexOf(id);

		position !== -1 && setSelectedProducts(prev => prev.filter((value, index) => index !== position));
	}

	function more(id) {
		setSelectedProducts(prev => [...prev, id]);
	}

	const deliveryPrice = 100;

	let itemsPrice = 0;

	for (let id of selectedProducts)
		itemsPrice += products.find(product => product._id === id)?.price;

	const totalPrice = itemsPrice + deliveryPrice;

	return (
		<Layout>
			{!products.length && (
				<div>
					Your cart is empty.
				</div>
			)}
			{!!products.length && products.map(product => {
				if (!selectedProducts.filter(id => id === product._id).length) return;

				return (
					<div key={product._id} className='flex mb-4'>
						<div className='bg-gray-100 rounded-xl shrink-0 p-3'>
							<img src={'/images/' + product.image} alt='' className='w-24' />
						</div>
						<div className='p-4'>
							<h3 className='font-bold text-lg'>{product.name}</h3>
							<p className='text-sm text-gray-500 leading-4'>{product.description}</p>
							<div className='flex'>
								<div className='grow'>
									{product.price}$
								</div>
								<div className='mt-2'>
									<button onClick={() => less(product._id)} className='border border-emerald-500 text-emerald-500 rounded-lg px-2'>-</button>
									<span className='px-2'>
										{selectedProducts.filter(id => id === product._id).length}
									</span>
									<button onClick={() => more(product._id)} className='bg-emerald-500 text-white rounded-lg px-2'>+</button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<form action='/api/checkout' method='POST'>
				<div className='mt-4'>
					<input
						type='text'
						name='name'
						onChange={e => setName(e.target.value)}
						value={name}
						placeholder='Name'
						className='w-full bg-gray-100 rounded-xl mb-2 px-4 py-2'
					/>
					<input
						type='email'
						name='email'
						onChange={e => setEmail(e.target.value)}
						value={email}
						placeholder='Email'
						className='w-full bg-gray-100 rounded-xl mb-2 px-4 py-2'
					/>
					<input
						type='text'
						name='city'
						onChange={e => setCity(e.target.value)}
						value={city}
						placeholder='City'
						className='w-full bg-gray-100 rounded-xl mb-2 px-4 py-2'
					/>
					<input
						type='number'
						name='zipCode'
						onChange={e => setZipCode(e.target.value)}
						value={zipCode}
						placeholder='Zip code'
						className='w-full bg-gray-100 rounded-xl mb-2 px-4 py-2'
					/>
				</div>
				<div className='mt-4'>
					<div className='flex my-3'>
						<h3 className='grow font-bold text-gray-400'>Items:</h3>
						<h3 className='font-bold'>{itemsPrice}$</h3>
					</div>
					<div className='flex my-3'>
						<h3 className='grow font-bold text-gray-400'>Delivery:</h3>
						<h3 className='font-bold'>{deliveryPrice}$</h3>
					</div>
					<div className='flex border-t border-dashed border-emerald-500 pt-3 my-3'>
						<h3 className='grow font-bold text-gray-400'>Total:</h3>
						<h3 className='font-bold'>{totalPrice}$</h3>
					</div>
				</div>
				<input
					type='hidden'
					name='products'
					value={selectedProducts.join(',')}
				/>
				<button type='submit' className='w-full bg-emerald-500 font-bold text-white rounded-xl shadow-lg shadow-emerals-200 my-4 px-5 py-2'>Pay {totalPrice}$</button>
			</form>
		</Layout>
	);
}
