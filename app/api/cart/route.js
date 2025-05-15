import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Cart from '../../models/Cart';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return NextResponse.json({
        userId,
        items: [],
        updatedAt: new Date(),
      });
    }
    
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    console.log('Cart Payload Received:', body);
    
    const { items } = body;
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items payload' }, { status: 400 });
    }
    
    await dbConnect();
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { userId, items, updatedAt: new Date() },
      { new: true, upsert: true }
    ).catch(err => {
      console.error('Mongoose update error:', err);
      throw err;
    });
    
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('POST /api/cart failed:', error.stack || error.message || error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}