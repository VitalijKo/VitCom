import { useState, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import { ProductsContext } from '../components/ProductsContext';

export default function Layout({ children }) {
	const { setSelectedProducts } = useContext(ProductsContext);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (window.location.href.includes('success')) {
			setSelectedProducts([]);
			setSuccess(true);
		}
	});

	return (
	<div>
		<div className='p-5'>
			{success && (
				<div className='bg-green-400 text-lg text-white rounded-xl mb-5 p-5'>
					Thanks for your order!
				</div>
			)}
			{children}
		</div>
	    <Footer />
	</div>
	);
}
