import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as productService from '../services/products';
import type { Product } from '../services/products';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img src={product.image} alt={product.name} className="w-full h-40 object-fill rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
            <p className="text-brand-primary font-bold mt-2">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;