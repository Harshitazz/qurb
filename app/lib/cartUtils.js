
export const parsePrice = (priceStr) =>
  parseFloat(priceStr.replace("£", "").trim()) || 0;

export const calculateCartTotals = (items) => {
  
  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const discount = items
    .filter((item) => item.isOffer)
    .reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  const total = subtotal - discount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};


  export const addToCart = (items, product) => {
    const existingItem = items.find(item => 
      item.productId === product.id && !item.isOffer
    );
    
    if (existingItem) {
      return items.map(item => {
        if (item.productId === product.id && !item.isOffer) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      return [...items, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.img,
        quantity: 1,
        isOffer: false,
        offerType: 'none'
      }];
    }
  };
  

  export const removeFromCart = (items, productId, isOffer) => {
    const existingItem = items.find(item => 
      item.productId === productId && item.isOffer === isOffer
    );
    
    if (existingItem && existingItem.quantity > 1) {
      return items.map(item => {
        if (item.productId === productId && item.isOffer === isOffer) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    } else {
      return items.filter(item => 
        !(item.productId === productId && item.isOffer === isOffer)
      );
    }
  };
  

  export const updateCartWithOffers = (currentItems, offerItems) => {
    const regularItems = currentItems.filter(item => !item.isOffer);
    
    return [...regularItems, ...offerItems];
  };


  export  const checkAvailability = (productId, currentQty,products , requestedQty = 1) => {
      const product = products?.find(p => p.id === productId);
      if (!product) return { success: false, message: 'Product not found' };
      
      const totalQty = currentQty + requestedQty;
      if (product.available && totalQty > product.available) {
        return { 
          success: false, 
          available: product.available,
          message: `Only ${product.available} item(s) available. You already have ${currentQty} in your cart.`
        };
      }
      
      return { success: true };
    };

    export  const getAvailabilityBadge = (product) => {
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