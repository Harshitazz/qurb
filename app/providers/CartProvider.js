'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { addToCart, removeFromCart, updateCartWithOffers } from '../lib/cartUtils';
import { calculateOffers } from '../lib/offerUtils';
import { useAuth, useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchCartFromDb();
    } else {
      setCartItems([]);
    }
  }, [isSignedIn, user]);

  const fetchCartFromDb = async () => {
    if (!isSignedIn || !user) return;
    
    const token = await getToken();
    setLoading(true);
    try {
      const response = await axios.get('/api/cart', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load your cart');
    } finally {
      setLoading(false);
    }
  };

  const saveCartToDb = async (updatedItems) => {
    if (isSaving) return null; 
    
    setIsSaving(true);
    const token = await getToken();
    
    try {
      const response = await axios.post('/api/cart', 
        { items: updatedItems }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setIsSaving(false);
      return response.data;
    } catch (error) {
      setIsSaving(false);
      console.error('Frontend error:', error.response?.data || error.message);
      toast.error('Failed to update your cart');
      return null; 
    }
  };

  const applyOffers = (items) => {
    const offerItems = calculateOffers(items, products);
    return updateCartWithOffers(items, offerItems);
  };

  const addItem = async (product) => {
    if (!isSignedIn || !user) {
      toast.error('Please log in to add items to your cart');
      return;
    }
    
    const previousItems = [...cartItems]; // Create a deep copy of previous state
    
    const updatedItems = addToCart(cartItems, product);
    const itemsWithOffers = applyOffers(updatedItems);
    
    // Optimistically update UI
    setCartItems(itemsWithOffers);
    
    // Attempt to save to database
    const saveResult = await saveCartToDb(itemsWithOffers);
    
    if (!saveResult) {
      // If save failed, revert to previous state
      setCartItems(previousItems);
      return;
    }
    
    toast.success(`Added ${product.name} to cart`);
  };
  
  const removeItem = async (productId, isOffer = false) => {
    if (!isSignedIn || !user) return;
    
    const previousItems = [...cartItems]; 
  
    const updatedItems = removeFromCart(cartItems, productId, isOffer);
    const itemsWithOffers = applyOffers(updatedItems);
  
    setCartItems(itemsWithOffers);
  
    const saveResult = await saveCartToDb(itemsWithOffers);
    
    if (!saveResult) {
      setCartItems(previousItems);
      return;
    }
    
    toast.success('Item removed from cart');
  };
  
  const clearCart = async () => {
    const previousItems = [...cartItems]; 
    
    setCartItems([]);
    
    const saveResult = await saveCartToDb([]);
    
    if (!saveResult) {
      setCartItems(previousItems);
      toast.error('Failed to clear your cart. Please try again.');
      return;
    }
    
    toast.success('Cart cleared');
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clearCart,
        loading,
        searchQuery,
        setSearchQuery,
        isSaving,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);