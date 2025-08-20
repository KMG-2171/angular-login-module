export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://picsum.photos/200/300',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://picsum.photos/200/300',
    description: 'Stay connected, track your fitness, and monitor your health with this stylish smart watch.',
  },
  {
    id: '3',
    name: 'Portable Speaker',
    price: 59.99,
    image: 'https://picsum.photos/200/300',
    description: 'Compact Bluetooth speaker delivering powerful sound for your adventures.',
  },
];

export const getProducts = async (): Promise<Product[]> => {
  // Mock async to mimic API call
  return new Promise(resolve => setTimeout(() => resolve(products), 300));
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise(resolve =>
    setTimeout(() => resolve(products.find(p => p.id === id)), 300)
  );
};