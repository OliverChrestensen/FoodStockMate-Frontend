"use client"

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="flex justify-between items-center p-5 border-b border-[#293851]">
        <div className="flex flex-row justify-content-center">
            <Link href="/" className="flex flex-row items-center gap-2">
                <Image src="/logo-fsm.png" alt="FoodStockMate" width={30} height={30} />
                <h1 className="text-2xl font-bold">FoodStockMate</h1>
            </Link>
        </div>
        <div className="flex gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-[#1DCD9F] font-medium">
                  Welcome, {user?.username}!
                </span>
                <button 
                  onClick={logout}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 gap-2 border border-[#1DCD9F] rounded-md">
                <Link href="/login" className="text-[#1DCD9F]">Login</Link>
              </div>
            )}
        </div>
    </div>
  )
}