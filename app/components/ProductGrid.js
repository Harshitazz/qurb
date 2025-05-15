'use client';

import ProductCard from './ProductCard';

const ProductGrid = ({ products, searchQuery }) => {
  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          No products found matching "{searchQuery}"
        </h2>
        <p className="mt-2 text-gray-500">
          Try a different search term or browse categories.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-14  ">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;