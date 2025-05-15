"use client";

import Image from "next/image";
import { FiPlusCircle, FiMinusCircle, FiTrash2 } from "react-icons/fi";
import { formatPrice } from "../lib/cartUtils";
import { useCart } from "../providers/CartProvider";

const CartItem = ({ item }) => {
  const { addItem, removeItem } = useCart();
  const isOfferItem = item.isOffer;

  const getOfferLabel = () => {
    if (item.offerType === "buy6get1") {
      return "Free (Buy 6 Get 1)";
    }
    if (item.offerType === "buy3get1coffee") {
      return "Free (With 3 Croissants)";
    }
    return null;
  };
  const parsePrice = (priceStr) =>
    parseFloat(priceStr.replace("£", "").trim()) || 0;

  return (
    <div
      className={` rounded-3xl shadow-md bg-white border ${
        isOfferItem ? "bg-green-50" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="relative h-22 w-22 mx-4">
          <Image
            src={item.image || "/images/placeholder.jpg"}
            alt={item.name}
            fill
            style={{ objectFit:"contain" }}
          />
        </div>

        <div className="flex-grow text-gray-500">
          <h3 className="font-medium ">{item.name}</h3>
          <div className="flex justify-between mt-1">
            {isOfferItem ? (
              <span className="text-green-600 font-medium text-sm">
                {getOfferLabel()}
              </span>
            ) : (
              <span>
                £{(parsePrice(item.price) * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center ml-4 lg:gap-30 sm:gap-10 gap-2 text-gray-700">
          <div className="flex  items-center">
            {!isOfferItem && (
              <div className="bg-red-400 w-6 h-6 rounded-md flex items-center justify-center">
                <button
                  onClick={() => removeItem(item.productId, item.isOffer)}
                  className="text-white hover:text-gray-200 font-bold"
                >
                  -
                </button>
              </div>
            )}

            <span className="sm:mx-3 mx-1 w-5 text-center">
              {item.quantity}
            </span>

            {!isOfferItem && (
                            <div className="bg-green-400 w-6 h-6 rounded-md flex items-center justify-center">

              <button
                onClick={() => {
                  const product = {
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  };
                  addItem(product);
                }}
                className="text-white hover:text-gray-200 font-bold"
                >
                +
              </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              for (let i = 0; i < item.quantity; i++) {
                removeItem(item.productId, item.isOffer);
              }
            }}
            className="mx-4 p-1 text-red-500 hover:text-red-700"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
