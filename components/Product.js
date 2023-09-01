import { useContext } from 'react';
import { ProductsContext } from './ProductsContext';

export default function Product({ _id, name, description, price, category, image }) {
  const { setSelectedProducts } = useContext(ProductsContext);

  function select() {
    setSelectedProducts(prev => [...prev, _id]);
  }

  return (
      <div className='w-64'>
        <div className='bg-blue-100 rounded-xl p-5'>
          <img src={'/images/' + image} alt='' />
        </div>
        <div className='mt-2'>
          <h3 className='font-bold text-lg'>{name}</h3>
        </div>
        <p className='text-sm text-gray-500 mt-1 leading-4'>{description}</p>
        <div className='flex mt-2'>
          <div className='text-2xl font-bold grow'>{price}$</div>
          <button onClick={select} className='bg-emerald-500 text-white rounded-xl px-3 py-1'>+</button>
        </div>
      </div>
    );
}
