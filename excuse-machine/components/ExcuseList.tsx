'use client'

import { useState } from 'react'

interface Excuse {
  id: string
  excuse_text: string
  votes: number
  created_at: string
}

interface ExcuseListProps {
  initialExcuses: Excuse[]
}

export default function ExcuseList({ initialExcuses }: ExcuseListProps) {
  const [excuses, setExcuses] = useState<Excuse[]>(initialExcuses)
  const [upvotingIds, setUpvotingIds] = useState<Set<string>>(new Set())

  const handleUpvote = async (id: string) => {
    if (upvotingIds.has(id)) return

    setUpvotingIds(prev => new Set(prev).add(id))

    // Optimistic update
    setExcuses(prevExcuses =>
      prevExcuses.map(excuse =>
        excuse.id === id
          ? { ...excuse, votes: excuse.votes + 1 }
          : excuse
      ).sort((a, b) => {
        if (b.votes !== a.votes) return b.votes - a.votes
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    )

    try {
      const response = await fetch(`/api/excuses/${id}/upvote`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to upvote')
      }

      const updatedExcuse = await response.json()
      
      // Update with server response
      setExcuses(prevExcuses =>
        prevExcuses.map(excuse =>
          excuse.id === id ? updatedExcuse : excuse
        ).sort((a, b) => {
          if (b.votes !== a.votes) return b.votes - a.votes
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
      )
    } catch (error) {
      // Revert optimistic update on error
      setExcuses(prevExcuses =>
        prevExcuses.map(excuse =>
          excuse.id === id
            ? { ...excuse, votes: excuse.votes - 1 }
            : excuse
        ).sort((a, b) => {
          if (b.votes !== a.votes) return b.votes - a.votes
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
      )
      console.error('Error upvoting:', error)
    } finally {
      setUpvotingIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (excuses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No excuses yet. Be the first to submit one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">All Excuses</h2>
      {excuses.map((excuse) => (
        <div
          key={excuse.id}
          className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-gray-800 mb-4">{excuse.excuse_text}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(excuse.created_at)}</span>
              <span className="font-semibold text-gray-700">{excuse.votes} {excuse.votes === 1 ? 'vote' : 'votes'}</span>
            </div>
            <button
              onClick={() => handleUpvote(excuse.id)}
              disabled={upvotingIds.has(excuse.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span>▲</span>
              <span>Upvote</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
