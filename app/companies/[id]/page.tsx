"use client"

import { useState, useEffect } from "react"
import { companies } from "../../../data/companies"
import Link from "next/link"

export default function CompanyProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [id, setId] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [enrichment, setEnrichment] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }

    unwrapParams()
  }, [params])

  const company = companies.find((c) => c.id === id)

  useEffect(() => {
    if (id) {
      const savedNote = localStorage.getItem(`notes-${id}`)
      if (savedNote) {
        setNotes(savedNote)
      }
    }
  }, [id])

  const handleSaveNote = () => {
    if (id) {
      localStorage.setItem(`notes-${id}`, notes)
      alert("Note saved!")
    }
  }

  if (!id) return <div>Loading...</div>

  if (!company) return <div>Company not found</div>

  return (
    <div>
      <Link href="/companies" className="text-blue-600">
        ← Back to Companies
      </Link>

      <h1 className="text-3xl font-bold mt-4">{company.name}</h1>

      <div className="mt-6 bg-white p-6 rounded shadow space-y-4">
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Location:</strong> {company.location}</p>
        <p><strong>Stage:</strong> {company.stage}</p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={company.website}
            target="_blank"
            className="text-blue-600 underline"
          >
            {company.website}
          </a>
        </p>
      </div>

      {/* Notes Section */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>

        <textarea
          className="w-full border p-2 rounded mb-3"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes here..."
        />

        <button
          onClick={handleSaveNote}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Note
        </button>
      </div>

      <button
  onClick={() => {
    const existing = JSON.parse(localStorage.getItem("saved-companies") || "[]")

    const alreadySaved = existing.find((c: any) => c.id === company.id)

    if (!alreadySaved) {
      existing.push(company)
      localStorage.setItem("saved-companies", JSON.stringify(existing))
      alert("Company saved to list!")
    } else {
      alert("Already saved!")
    }
  }}
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
>
  Save to List
</button>
<button
  onClick={async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: company.website }),
      })

      if (!res.ok) {
        throw new Error("Failed to enrich")
      }

      const data = await res.json()
      setEnrichment(data)

    } catch (error) {
      alert("Enrichment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }}
  disabled={loading}
  className="mt-6 bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
>
  {loading && (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}
  {loading ? "Enriching..." : "Enrich"}
</button>
{enrichment && (
  <div className="mt-6 bg-white p-6 rounded shadow space-y-4">
    <h2 className="text-xl font-semibold">AI Enrichment</h2>

    <p><strong>Summary:</strong> {enrichment.summary}</p>

    <div>
      <strong>What They Do:</strong>
      <ul className="list-disc ml-6">
        {enrichment.whatTheyDo?.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <div>
      <strong>Keywords:</strong>
      <p>{enrichment.keywords?.join(", ")}</p>
    </div>

    <div>
      <strong>Signals:</strong>
      <ul className="list-disc ml-6">
        {enrichment.signals?.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <p className="text-sm text-gray-500">
  Enriched at: {new Date(enrichment.timestamp).toLocaleString()}
</p>
  </div>
)}
    </div>
  )
}