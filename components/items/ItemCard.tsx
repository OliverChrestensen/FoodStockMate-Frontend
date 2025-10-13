"use client"
import Image from "next/image"
import type { Item } from "@/types/Item"

export function ItemCard({ item, onEdit, onDelete }: {
  item: Item
  onEdit: (item: Item) => void
  onDelete: (id: number) => void
}) {
  const formatUnit = (unit: string, quantity: number) => {
    switch (unit) {
      case "pakke":
        return quantity === 1 ? "pack" : "packs"
      case "pose":
        return quantity === 1 ? "bag" : "bags"
      case "stk":
        return quantity === 1 ? "piece" : "pieces"
      case "kg":
        return "kg"
      case "l":
        return "L"
      default:
        return unit
    }
  }
  return (
    <div className="group p-4 rounded-lg bg-[#192234] border border-[#293851] min-w-100">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        <div className="flex gap-2">
          <button aria-label="Edit item" onClick={() => onEdit(item)} className="opacity-0 group-hover:opacity-100 hover:scale-110 transition">
            <Image src="/edit-icon.svg" alt="edit" width={20} height={20} />
          </button>
          <button aria-label="Delete item" onClick={() => onDelete(item.id)} className="opacity-0 group-hover:opacity-100 hover:scale-110 transition">
            <Image src="/delete-icon.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>

    
      <div className="flex justify-between text-sm">
        <p className="my-2 text-[#93A2B7]">Location:</p>
        <span className="text-[#1DCD9F] my-2 capitalize">{item.location}</span>
      </div>
      <div className="flex justify-between text-sm">
        <p className="my-2 text-[#93A2B7]">Quantity:</p>
        <span className="text-[#1DCD9F] my-2">{item.quantity} {formatUnit(item.unit, item.quantity)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-sm my-2 text-[#93A2B7]">Expires:</p>
        <span className="text-red-500 my-2">{item.expiryDate}</span>
      </div>
      <div className="flex flex-col">
        <p className="text-sm my-2 text-[#93A2B7]">Notes:</p>
        <span className="text-[#93A2B7] text-sm">{item.notes}</span>
      </div>
    </div>
  )
}


