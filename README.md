# Grocery Shopping Web App

A simple grocery shopping application that allows users to search for products, add them to cart, and apply special offers.

## Features

- Browse products by category: Fruit, Drinks, and Bakery
- Search for products by name
- Add products to cart with stock validation
- Automatic application of special offers:
  - Buy 6 cans of Coca-Cola, get 1 free
  - Buy 3 croissants, get a free coffee
- View cart with subtotal, discount, and total calculations
- Responsive design for mobile and desktop

## Setup Instructions

1. Clone the repository:
```
git clone https://github.com/yourusername/grocery-shop.git
cd grocery-shop
```

2. Install dependencies:
```
npm install
```

3. Run the development server:
```
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Clerk (for authentication)

## API Information

The application uses the following API endpoint to fetch products:
```
https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all
```

Categories: `fruit`, `drinks`, `bakery`, or `all`

## Business Logic

### Product Display
- Products with 10+ items in stock show "Available"
- Products with less than 10 items show exact quantity

### Special Offers
- Buy 6 Coca-Cola cans, get 1 free
- Buy 3 croissants, get a free coffee
- Offers are automatically applied when conditions are met
- Free items are clearly marked in the cart

### Cart Functionality
- Items can be added and removed from cart
- Cart persists between pages
- Stock validation prevents adding more items than available

## Implementation Flow

### 1. User Experience Journey

I approached this project by thinking about the customer shopping journey:

1. **Browsing & Searching**: Users need to easily find products through categories or search
2. **Stock Information**: Users need clear visibility of product availability
3. **Adding to Cart**: Fast, intuitive process with appropriate feedback
4. **Special Offers**: Automatically applied with clear visibility
5. **Cart Review**: Complete overview with easy modification options
6. **Checkout**: Clear breakdown of prices and discounts

### 2. State Management Strategy

For a seamless shopping experience, I focused on robust state management:

- **Central Cart Context**: Single source of truth for all cart operations
- **Real-time Offer Processing**: Offers are calculated whenever cart changes
- **Optimistic UI Updates**: UI updates immediately while database sync happens in background
- **Persistent Storage**: Cart retains state between page navigation and refreshes

### 3. Offer Implementation Approach

The special offers are implemented following these steps:

1. When items are added to cart, check if any offer conditions are met
2. If conditions are met, automatically add offer items to cart with special "offer" flag
3. Display offer items distinctly in the cart with "FREE" label
4. Include original price in offer items (but charge $0) to show discount value
5. If qualifying items are removed and offer no longer applies, automatically remove offer items

### 4. Error Handling & Edge Cases

I considered several edge cases to ensure robustness:

- **Out-of-stock scenarios**: Prevent adding more items than available
- **Network failures**: Graceful degradation with cached data
- **Partial offer qualification**: Only apply offers when fully qualified
- **Offer stacking**: Handle multiple instances of the same offer (e.g., 12 Coca-Colas = 2 free cans)

## Live Demo

View the live application at: [https://grocery-shop-demo.vercel.app](https://grocery-shop-demo.vercel.app)