"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "../providers/CartProvider";
import SearchBar from "./SearchBar";
import {  BsShopWindow } from "react-icons/bs";
import { useWishlist } from "../providers/WishlistProvider";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import Wishlist from './Wishlist'
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const { cartItems } = useCart();
  const { setSearchQuery } = useCart();
  const { wishlistItems } = useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const wishlistItemCount = wishlistItems.length;

  const toggleWishlistDropdown = () => {
    setShowWishlist(!showWishlist);
  };

  return (
    <header className=" lg:mx-4">
      <div className="container mx-auto sm:px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="lg:text-2xl sm:text-xl text-sm font-bold font-almarai text-gray-700"
          >
            GROCERIES
          </Link>
        </div>
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center space-x-6 ">
          <div className="relative cursor-pointer ">
            <button
              className="flex items-center text-gray-700 hover:text-red-400"
              onClick={toggleWishlistDropdown}
              aria-label="Wishlist"
            >
              <AiFillHeart className="h-8 w-8 m-1" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>

            {showWishlist && (
              <Wishlist wishlistItems={wishlistItems} setShowWishlist={setShowWishlist}/>
            )}
          </div>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton>
              <button className="flex items-center text-gray-700">
                {/* <FiUser className="h-8 w-8 mr-1" /> */}
                <span>Sign In</span>
              </button>
            </SignInButton>
          )}
          {pathname === "/" ? (
            <Link href="/checkout" className="relative flex items-center">
            <Image
              src="/icon.svg"
              alt="Cart"
              width={32}
              height={32}
              className="m-1 text-gray-600"
            />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          ) : (
            <Link href="/" className="flex items-center text-gray-700">
              <BsShopWindow className="h-8 w-8 mr-1" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
