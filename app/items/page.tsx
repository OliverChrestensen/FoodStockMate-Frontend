"use client"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { useRef, useState } from "react"
import { useItems } from "@/hooks/useItems"
import { ItemCard } from "@/components/items/ItemCard"
import { EditItemModal } from "@/components/items/EditItemModal"
import type { Item } from "@/types/Item"

export default function Item() {
    const { user } = useAuth()
    const { items, searching, error, updateItem, deleteItem, searchItems } = useItems(user?.token)
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const [search, setSearch] = useState("")
    const searchTimerRef = useRef<number | null>(null)
   
    if (error) return <div>Error: {error}</div>

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-2xl font-bold text-center text-[#1DCD9F] mt-10 mb-10">Items</h1>
            <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        value={search} 
                        onChange={(e) => {
                            const val = e.target.value
                            setSearch(val)
                            if (searchTimerRef.current) {
                                clearTimeout(searchTimerRef.current)
                            }
                            searchTimerRef.current = window.setTimeout(() => {
                                searchItems(val)
                            }, 350)
                        }}
                        className="w-full bg-[#293851] p-3 pr-10 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                    />
                    {(searching) && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#93A2B7] text-sm">Searching…</span>
                    )}
                </div>
            </div>
            <div>
                {items.length > 0 ? (
                    <div className="flex flex-row justify-center gap-4 flex-wrap">
                        {items.map(item => (
                            <ItemCard key={item.id} item={item} onEdit={setEditingItem} onDelete={(id) => {
                                if (confirm("Are you sure you want to delete this item?")) {
                                    deleteItem(id)
                                }
                            }} />
                        ))}
                    </div>
                ) : (
                    <p>No items found</p>
                )}
                <div className="flex justify-center mt-10">
                    <button className="px-4 py-2 rounded-md bg-[#1DCD9F] text-black font-bold hover:bg-[#1DCD9F]/80">
                        <Link href="/items/add">Add Item</Link>
                    </button>
                </div>
            </div>
            
            {/* Edit Modal */}
            {editingItem && (
                <EditItemModal 
                    item={editingItem} 
                    onClose={() => setEditingItem(null)} 
                    onSubmit={updateItem}
                />
            )}
        </div>
    )
}