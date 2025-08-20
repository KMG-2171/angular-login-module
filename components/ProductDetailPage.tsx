import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as productService from '../services/products';
import type { Product } from '../services/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (id) {
      productService.getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">Product not found.</p>
        <Link to="/products" className="text-brand-primary underline mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <img src={product.image} alt={product.name} className="w-full h-64 object-fill rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
      <p className="text-xl text-brand-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
      <Link to="/products" className="text-brand-primary underline">
        ← Back to products
      </Link>
    </div>
  );
};

export default ProductDetailPage;