"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { calculateCartTotals } from "../lib/cartUtils";
import { useCart } from "../providers/CartProvider";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const CheckoutSummary = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const { subtotal, discount, total } = calculateCartTotals(cartItems);
  const { getToken } = useAuth();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const token = await getToken();

      await axios.post(
        "/api/checkout",
        {
          items: cartItems,
          subtotal,
          discount,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      clearCart();

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="  text-gray-400">
      <div className=" m-4 pt-2 flex flex-col gap-2 border-t">
        <div className="flex justify-evenly p-4">
          <span className=" font-semibold text-gray-600">Subtotal</span>
          <span>£{subtotal}</span>
        </div>

        <div className="flex justify-evenly border-t p-4">
          <span className=" font-semibold text-gray-600">Discounts</span>
          <span>-£{discount}</span>
        </div>

        <div>
          <div className="flex justify-evenly border-t p-4">
            <span className=" font-semibold text-gray-600">Total</span>
            <span>£{total}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCheckout}
          disabled={isProcessing || cartItems.length === 0}
          className={`p-3 w-1/3 rounded-lg font-medium ${
            isProcessing || cartItems.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          } transition`}
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
