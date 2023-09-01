import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Product from '../components/Product';
import { initDB } from '../lib/db';
import { getAllProducts } from './api/products';

export default function Home({ products }) {
  const [query, setQuery] = useState('');

  const categories = [...new Set(products.map(product => product.category))];
  const query_products = query ? products.filter(product => product.name.toLowerCase().includes(query)) : products;

  return (
    <Layout>
      <input
        type='text'
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder='Search...'
        className='w-full bg-gray-100 rounded-xl px-4 py-2'
      />
      <div>
        {categories.map(category => (
          <div key={category}>
            {query_products.find(product => product.category == category) && (
              <div>
                <h2 className='text-2xl capitalize py-5'>{category}</h2>
                <div className='flex overflow-x-scroll snap-x scrollbar-hide -mx-5'>
                  {query_products.filter(product => product.category === category).map(product => (
                    <div key={product._id} className='snap-start px-5'>
                      <Product {...product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initDB();
  const products = await getAllProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
