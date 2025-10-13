"use client"
import { useState } from "react"
import type { Item } from "@/types/Item"

export function EditItemModal({ item, onClose, onSubmit }: {
  item: Item
  onClose: () => void
  onSubmit: (next: Item) => Promise<void>
}) {
  const [form, setForm] = useState<Item>({
    ...item,
    purchaseDate: (item.purchaseDate || "").split("T")[0],
    expiryDate: (item.expiryDate || "").split("T")[0],
  })
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr("")
    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to update"
      setErr(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="bg-[#192234] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1DCD9F]">Edit Item</h2>
          <button aria-label="Close" onClick={onClose} className="text-[#93A2B7] hover:text-white">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Item Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#93A2B7] mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#93A2B7] mb-2">Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full bg-[#293851] p-3 rounded-lg text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
              >
                <option value="pakke">Pack</option>
                <option value="pose">Bag</option>
                <option value="stk">Piece</option>
                <option value="kg">Kg</option>
                <option value="l">Liter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#93A2B7] mb-2">Location</label>
            <select
              name="location"
              value={form.location}
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
                value={form.purchaseDate}
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
                value={form.expiryDate}
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
              value={form.notes ?? ""}
              onChange={handleChange}
              className="w-full bg-[#293851] p-3 rounded-lg placeholder:text-[#93A2B7] focus:outline-none focus:ring-0 border-0"
              rows={3}
            />
          </div>

          {err && <p className="text-red-500 text-center text-sm">{err}</p>}

          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-[#93A2B7] text-[#93A2B7] rounded-lg font-bold hover:bg-[#93A2B7]/10">Cancel</button>
            <button type="submit" disabled={submitting} className="flex-1 px-4 py-3 bg-[#1DCD9F] text-black rounded-lg font-bold hover:bg-[#1DCD9F]/80 disabled:opacity-50">
              {submitting ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


