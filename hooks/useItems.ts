"use client"
import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import type { Item } from "@/types/Item"

export function useItems(token?: string) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError("")
    try {
      const res = await apiFetch("/api/items/user", { method: "GET" }, token)
      const data: Item[] = await res.json()
      setItems(data)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load items")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) refresh()
  }, [token, refresh])

  const updateItem = useCallback(async (partial: Item) => {
    const res = await apiFetch(
      `/api/items/${partial.id}`,
      { method: "PUT", body: JSON.stringify(partial) },
      token
    )
    const next: Item = await res.json()
    setItems(prev => prev.map(i => (i.id === next.id ? next : i)))
  }, [token])

  const deleteItem = useCallback(async (id: number) => {
    await apiFetch(`/api/items/${id}`, { method: "DELETE" }, token)
    setItems(prev => prev.filter(i => i.id !== id))
  }, [token])

  const searchItems = useCallback(async (keyword: string) => {
    if (!token) return
    if (!keyword || keyword.trim() === "") {
      await refresh()
      return
    }
    setSearching(true)
    setError("")
    try {
      const res = await apiFetch(`/api/items/search?keyword=${encodeURIComponent(keyword)}`, { method: "GET" }, token)
      const data: Item[] = await res.json()
      setItems(data)
    } catch (e: any) {
      setError(e?.message ?? "Search failed")
    } finally {
      setSearching(false)
    }
  }, [token, refresh])

  return { items, loading, searching, error, refresh, updateItem, deleteItem, searchItems }
}


