// app/login/page.tsx (Next.js 13+ med App Router)

"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { API_URL } from "@/lib/api"
export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        const data = await res.json()
        // Use auth context to set user state
        login(username, data.token)
        router.push("/items")
      } else {
        const errorText = await res.text()
        throw new Error(errorText || "Login failed")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setError("✅ User registered successfully! Redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const errorText = await res.text();
        setError("❌ Failed to register: " + errorText);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      setError("⚠️ Something went wrong: " + message);
    }
  }

  const handleGuestLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "guest", password: "guest123!" }),
      })

      if (!res.ok) {
        throw new Error("Guest login failed")
      }

      const data = await res.json()
      // Use auth context to set guest user state
      login("guest", data.token)
      localStorage.setItem("userType", "guest")

      router.push("/items")
    } catch (err) {
      setError("Guest account not available. Please contact administrator.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen flex items-center justify-center">
      <div className=" bg-[#192234] max-w-md w-full mx-4 p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <Image className="mx-auto" src="/logo-fsm.png" alt="FoodStockMate" width={120} height={120} />
          <h2 className="text-xl text-center font-bold">FoodStockMate</h2>
          <p className="text-center text-medium text-[#93A2B7] max-w-2xl mx-auto mb-5">Manage your food inventory effortlessly</p>
          
          {/* Segmented Control */}
          <div className="flex bg-[#293851] rounded-lg p-1 mb-5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-bold transition-all ${
                isLogin
                  ? "bg-[#1DCD9F] text-black"
                  : "text-[#93A2B7] hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-bold transition-all ${
                !isLogin
                  ? "bg-[#1DCD9F] text-black"
                  : "text-[#93A2B7] hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="flex flex-col gap-5">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full bg-[#293851] p-2 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
              required
            />
            
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-[#293851] p-2 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
              required
            />
            
            {!isLogin && (
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full bg-[#293851] p-2 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                required
              />
            )}
            
            <button type="submit" className="w-full bg-[#1DCD9F] text-black p-2 rounded-lg font-bold hover:bg-[#1DCD9F]/80">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            
            <button type="button" onClick={handleGuestLogin} className="w-full text-[#1DCD9F] p-2 rounded-lg font-bold hover:bg-[#1DCD9F]/10">
              Use guest account
            </button>
            
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
