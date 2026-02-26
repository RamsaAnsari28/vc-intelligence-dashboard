"use client"

import { useState } from "react"
import { companies } from "../../data/companies"
import Link from "next/link"

export default function CompaniesPage() {
  const [search, setSearch] = useState("")

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Companies</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search companies..."
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-300">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Industry</th>
              <th className="p-3">Location</th>
              <th className="p-3">Stage</th>
            </tr>
          </thead>

          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-blue-600">
                  <Link href={`/companies/${company.id}`}>
                    {company.name}
                  </Link>
                </td>
                <td className="p-3">{company.industry}</td>
                <td className="p-3">{company.location}</td>
                <td className="p-3">{company.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}