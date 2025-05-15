"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  FiUser } from "react-icons/fi";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "../providers/CartProvider";
import SearchBar from "./SearchBar";
import { BsShopWindow } from "react-icons/bs";

const Header = () => {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery } = useCart();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto sm:px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="lg:text-3xl sm:text-xl text-sm font-bold font-almarai text-gray-700"
          >
            GROCERIES
          </Link>
        </div>
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center space-x-6 ">
          {pathname === "/" ? (
            <Link href="/checkout" className="relative flex items-center">
              <img
                src="/icon.svg" 
                alt="Cart"
                className="h-5 w-5 object-contain"
              />{" "}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          ) : (
            <Link href="/" className="flex items-center text-gray-700">
              <BsShopWindow className="h-5 w-5 mr-1" />
            </Link>
          )}

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton>
                <button className="flex items-center text-gray-700">
                  <FiUser className="h-5 w-5 mr-1" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
