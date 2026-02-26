"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ListsPage() {
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("saved-companies") || "[]")
    setSavedCompanies(stored)
  }, [])

  const removeCompany = (id: string) => {
    const updated = savedCompanies.filter((c) => c.id !== id)
    localStorage.setItem("saved-companies", JSON.stringify(updated))
    setSavedCompanies(updated)
  }
return (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Saved Companies</h2>

    {savedCompanies.length === 0 && (
      <div className="bg-white p-10 rounded shadow hover:shadow-lg transition duration-300 text-center">
        <h2 className="text-xl font-semibold mb-2">
          No companies saved yet
        </h2>
        <p className="text-gray-500">
          Start exploring companies and save them to build your watchlist.
        </p>
      </div>
    )}

    {savedCompanies.length > 0 && (
      <div className="bg-white rounded shadow hover:shadow-lg transition duration-300 p-6 space-y-4">
        {savedCompanies.map((company) => (
          <div
            key={company.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <Link
              href={`/companies/${company.id}`}
              className="text-blue-600 hover:underline"
            >
              {company.name}
            </Link>

            <button
              onClick={() => removeCompany(company.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}
