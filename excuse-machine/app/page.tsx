import { prisma } from '@/lib/prisma'
import ExcuseForm from '@/components/ExcuseForm'
import ExcuseList from '@/components/ExcuseList'

async function getExcuses() {
  try {
    const excuses = await prisma.excuse.findMany({
      orderBy: [
        { votes: 'desc' },
        { created_at: 'desc' }
      ]
    })
    return excuses
  } catch (error) {
    console.error('Error fetching excuses:', error)
    return []
  }
}

export default async function Home() {
  const excuses = await getExcuses()

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            The Excuse Machine
          </h1>
          <p className="text-gray-600 mb-8">
            Submit creative excuses for late assignments and vote on your favorites!
          </p>
          <ExcuseForm />
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <ExcuseList initialExcuses={excuses.map(excuse => ({
            id: excuse.id,
            excuse_text: excuse.excuse_text,
            votes: excuse.votes,
            created_at: excuse.created_at.toISOString()
          }))} />
        </div>
      </div>
    </main>
  )
}
