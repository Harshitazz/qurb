"use client";

import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { useCart } from "../providers/CartProvider";
import { useWishlist } from "../providers/WishlistProvider";
import { getAvailabilityBadge } from "../lib/cartUtils";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isProductWishlisted } = useWishlist();

  const wishlisted = isProductWishlisted(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };



  return (
    <div
      className="
    relative
    rounded-3xl
    p-4 flex gap-4
    transition-shadow duration-300
    shadow-[0_0_10px_0_rgba(0,0,0,0.15)]   
    hover:shadow-[0_0_18px_0_rgba(0,0,0,0.18)]
    bg-white
"
    >
      {" "}
      <div className="relative w-1/2 h-48">
        <Image
          src={product.img || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col w-1/2">
        <h3 className="text-base font-semibold mb-1 text-gray-700">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-auto">
          {product.description || ""}
        </p>

        <div>{getAvailabilityBadge(product)}</div>

        <div className="flex justify-between items-center mt-3">
          <div className="font-bold mt-2 text-gray-600">
            {typeof product.price === "number"
              ? `$${product.price.toFixed(2)}`
              : product.price}
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => product.available > 0 && addItem(product)}
              disabled={product.available <= 0}
              className={`p-2 rounded-md transition-colors cursor-pointer group-hover:text-black group ${
                product.available > 0
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Add to cart"
            >
              <Image
                src="/buy-button.svg"
                alt="Cart"
                width={20}
                height={20}
                className="m-1 "
              />
            </button>

            <button
              className="focus:outline-none"
              onClick={handleWishlistToggle}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <AiFillHeart
                size={24}
                className={`transition-colors ${
                  wishlisted
                    ? "text-red-400"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
