import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Order from '../../models/Order';
import Cart from '../../models/Cart';
import { calculateCartTotals } from '../../lib/cartUtils';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request) {
  try {
        const { userId } = getAuth(request);
    
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart || !cart.items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    
    const { subtotal, discount, total } = calculateCartTotals(cart.items);
    
    const order = await Order.create({
      userId,
      items: cart.items,
      subtotal,
      discount,
      total
    });
    
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    );
    
    return NextResponse.json({ 
      message: 'Order placed successfully', 
      orderId: order._id 
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to checkout' }, { status: 500 });
  }
}