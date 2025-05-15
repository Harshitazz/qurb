'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import { CartProvider, useCart } from './providers/CartProvider';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {searchQuery,setSearchQuery}=useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${selectedCategory}`
        );
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);


  
  const handleCategoryChange = (category:string) => {
    setSelectedCategory(category);
    setSearchQuery(''); 
  };
  

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }
  
  return (
    <div className='m-6 lg:mr-40'>
      
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <ProductGrid products={products} searchQuery={searchQuery} />
    </div>
  );
}