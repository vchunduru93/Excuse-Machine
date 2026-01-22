'use client'

import { useState } from 'react'

export default function ExcuseForm() {
  const [excuseText, setExcuseText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!excuseText.trim()) {
      setError('Please enter an excuse')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/excuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ excuse_text: excuseText }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit excuse')
      }

      setExcuseText('')
      // Reload page to show new excuse
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit excuse')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="excuse" className="block text-sm font-medium text-gray-700 mb-2">
          Submit Your Excuse
        </label>
        <textarea
          id="excuse"
          value={excuseText}
          onChange={(e) => setExcuseText(e.target.value)}
          placeholder="Enter your creative excuse here..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSubmitting}
        />
      </div>
      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={isSubmitting || !excuseText.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Excuse'}
      </button>
    </form>
  )
}
