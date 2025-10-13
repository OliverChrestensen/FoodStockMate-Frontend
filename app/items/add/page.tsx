"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function AddItem() {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "pakke",
        location: "freezer",
        purchaseDate: "",
        expiryDate: "",
        notes: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { user } = useAuth()
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("http://localhost:8080/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    ...formData,
                    quantity: parseInt(formData.quantity)
                })
            })

            if (res.ok) {
                router.push("/items")
            } else {
                const errorText = await res.text()
                setError(`Failed to add item: ${errorText}`)
            }
        } catch (err) {
            setError(`Error: ${err}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-2xl font-bold text-center text-[#1DCD9F] mb-10">Add New Item</h1>
            
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#93A2B7] mb-2">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                                placeholder="0"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Unit</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full bg-[#293851] p-3 rounded-lg text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                            >
                                <option value="pack">Pack</option>
                                <option value="bag">Bag</option>
                                <option value="piece">Piece</option>
                                <option value="kg">Kg</option>
                                <option value="l">Liter</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#93A2B7] mb-2">Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-[#293851] p-3 rounded-lg text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                        >
                            <option value="freezer">Freezer</option>
                            <option value="fridge">Fridge</option>
                            <option value="pantry">Pantry</option>
                            <option value="cupboard">Cupboard</option>
                            <option value="counter">Counter</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Purchase Date</label>
                            <input
                                type="date"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                className="w-full bg-[#293851] p-3 rounded-lg text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Expiry Date</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className="w-full bg-[#293851] p-3 rounded-lg text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#93A2B7] mb-2">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                            placeholder="Additional notes (e.g., organic, brand, etc.)"
                            rows={3}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-center text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.push("/items")}
                            className="flex-1 px-4 py-3 border border-[#93A2B7] text-[#93A2B7] rounded-lg font-bold hover:bg-[#93A2B7]/10"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-[#1DCD9F] text-black rounded-lg font-bold hover:bg-[#1DCD9F]/80 disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}