'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      return true; 
    }
    
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      description: product.description,
      available: product.available,
      type: product.type
    };
    
    setWishlistItems(prev => [...prev, wishlistItem]);
    toast.success(`Added ${product.name} to wishlist`);
    return true;
  };
  
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Item removed from wishlist');
    return true;
  };
  
  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      return removeFromWishlist(product.id);
    } else {
      return addToWishlist(product);
    }
  };
  
  const isProductWishlisted = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
    return true;
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isProductWishlisted,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);