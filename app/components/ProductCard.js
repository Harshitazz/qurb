'use client';

import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { useCart } from '../providers/CartProvider';
import { useWishlist } from '../providers/WishlistProvider';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isProductWishlisted } = useWishlist();

  const wishlisted = isProductWishlisted(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const getAvailabilityBadge = () => {
    if (product.available >= 10)
      return (
        <span className="inline-block bg-green-300 text-white text-xs px-3 py-1 rounded-full">
          Available
        </span>
      );
    if (product.available > 0)
      return (
        <span className="inline-block bg-orange-300 text-white text-xs px-3 py-1 rounded-full">
          Only {product.available} left
        </span>
      );
    return (
      <span className="inline-block bg-red-300 text-white text-xs px-3 py-1 rounded-full">
        Out of stock
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-md transition-shadow duration-300 p-4 flex gap-4">
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
            {typeof product.price === 'number'
              ? `$${product.price.toFixed(2)}`
              : product.price}
          </div>

          <div className="flex gap-4 items-center">
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

            <button
              className="focus:outline-none"
              onClick={handleWishlistToggle}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <AiFillHeart
                size={24}
                className={`transition-colors ${
                  wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
