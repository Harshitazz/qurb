'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useCart } from '../providers/CartProvider';
import CartItem from '../components/CartItem';
import CheckoutSummary from '../components/CheckoutSummary';
import { toast } from 'react-toastify';

export default function Checkout() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { cartItems, loading ,products} = useCart();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error('Please sign in to access the checkout');
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);
  
  if (isSignedIn && cartItems.length === 0 && !loading) {
    return (
      <div className="text-center py-12 text-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Start adding items to your cart to see them here.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  const groupedItems = [
    ...cartItems.filter(item => !item.isOffer),
    ...cartItems.filter(item => item.isOffer)
  ];
  
  return (
    <div className='mx-0 lg:mx-8 '>
      <h1 className="text-3xl font-bold mb-4  text-gray-600">Checkout</h1>
      
      <div className="lg:w-[80%] flex flex-col gap-8 m-10 my-20">
        <div className="lg:col-span-2 gap-6 flex flex-col">
            {groupedItems.map((item, index) => (
              <CartItem key={`${item.productId}-${item.isOffer}-${index}`} item={item} products={products}/>
            ))}
        </div>
        
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}