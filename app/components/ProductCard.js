'use client';

import Image from 'next/image';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../providers/CartProvider';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const getAvailabilityBadge = () => {
    if (product.available >= 10) {
      return (
        <span className="inline-block bg-green-300 text-white text-xs px-3 py-1 rounded-full">
          Available
        </span>
      );
    }
    if (product.available > 0) {
      return (
        <span className="inline-block bg-orange-300 text-white text-xs px-3 py-1 rounded-full">
          Only {product.available} left
        </span>
      );
    }
    return (
      <span className="inline-block bg-red-300 text-white text-xs px-3 py-1 rounded-full">
        Out of stock
      </span>
    );
  };

  const HeartIcon = ({ active }) => {
    return active ? (
      <svg className="w-6 h-6 fill-red-500" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ) : (
      <FiHeart size={24} className="text-gray-400 hover:text-red-500 transition-colors" />
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex gap-4">
      <div className="relative w-1/2 h-48">
        <Image
          src={product.img || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col w-1/2">
        <h3 className="text-base font-semibold mb-1 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-auto">{product.description || ''}</p>

        <div>{getAvailabilityBadge()}</div>

        <div className="flex justify-between items-center mt-3">
          <div className="font-bold text-lg mt-2 text-gray-700">
            {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
          </div>
          <div className="flex gap-4 items-center justify-evenly">
            
              <button
                onClick={() => product.available > 0 && addItem(product)}
                disabled={product.available <= 0}
                className={`p-2 rounded-md transition-colors ${
                  product.available > 0 
                    ? 'text-gray-700 hover:text-green-600' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Add to cart"
              >
                <FiShoppingCart size={20} />
              </button>
            
            <button className="focus:outline-none">
              <HeartIcon active={product.isWishlisted} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;