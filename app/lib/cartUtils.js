
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